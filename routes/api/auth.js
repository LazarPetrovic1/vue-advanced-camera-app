const router = require('express').Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec
const os = require('os')

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Internal server error.')
  }
})

router.post(
  '/',
  [
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Password is required.').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      let user = await User.findOne({email})

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials.' }] })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials.' }] })
      }

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn: 3600000},
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (e) {
      console.error(e.message)
      res.status(500).send('Internal server error')
    }
  }
)

router.post('/image/', (req, res) => {
  const {img} = req.body
  const base64data = img.replace(/^data:image\/png;base64,/, '')
  const filename = new Date().toString().replace(/[^a-z0-9\-]/gi, '_')
  const imagepath = process.platform === 'win32' ?
    `${__dirname}\\..\\..\\client\\src\\assets\\images` :
    `${__dirname}/../../client/src/assets/images`
    // `${os.homedir()}/proj/fullstack-vue-app/client/src/assets/images` :
  fs.writeFile(
    `${imagepath}/${filename}.png`,
    base64data,
    'base64',
    (err) => console.log(err)
  )
  // console.log(req.body)
  res.json({msg: 'Got it!'})
})

router.get('/image', (req, res) => {
  const openCmds = {
    darwin: 'open',
    win32: 'explorer',
    linux: 'nautilus'
  }

  const cmd = openCmds[process.platform.toLowerCase()]
  const fullCmd = process.platform === 'win32' ?
    `${cmd} ${__dirname}\\..\\..\\client\\src\\assets\\images` :
    `${cmd} ${__dirname}/../../client/src/assets/images`
  if (cmd) {
    exec(fullCmd)
    // exec(`${cmd} ${os.homedir()}/proj/fullstack-vue-app/client/src/assets/images`)
  }

  res.json({msg: 'Done.'})
})

router.get('/images', (req, res) => {
  const images = fs.readdirSync(
    process.platform === 'win32' ?
    `${__dirname}\\..\\..\\client\\src\\assets\\images` :
    `${__dirname}/../../client/src/assets/images`
  )

  res.json(
    {
      images
    }
  )
})

router.delete('/images/:name', (req, res) => {
  const path = process.platform === 'win32' ?
    `${__dirname}\\..\\..\\client\\src\\assets\\images` :
    `${__dirname}/../../client/src/assets/images`
  const {name} = req.params
  fs.unlink(process.platform === 'win32' ? `${path}\\${name}` : `${path}/${name}`, (err) => {
    if (err) throw err
  })
  res.json({msg: 'File deleted successfully.'})
})

module.exports = router

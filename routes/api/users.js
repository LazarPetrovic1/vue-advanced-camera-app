const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')

router.post(
  '/',
  [
    check('name', 'Name is required.')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters.'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {name, email, password} = req.body

    try {
      let user = await User.findOne({email})

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists.' }] })
      }

      user = new User({
        name,
        email,
        password
      })

      // Encrypt the password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()

      // Return JWT
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
          return res.json({token})
        }
      )
    } catch (e) {
      console.error(e.message)
      res.status(500).send('Internal server error')
    }
  }
)

module.exports = router

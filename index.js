const express = require('express'),
  app = express(),
  PORT = process.env.PORT || 5000,
  connectDB = require('./config/db'),
  cors = require('cors')

connectDB()
app.use(express.json({limit: '10mb', extended: true}))
app.use(express.urlencoded({limit: '10mb'}))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello')
})

app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

app.listen(PORT, () => {
  console.log(`
    Server listening on port ${PORT}.
    Go to http://localhost:${PORT}.
  `)
})

const port = 3999
const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user')

const app = express()

app.get('/user', (req, res) => {
  User.findUserByName('alex', (err, user) => {
    res.json(user)
  })
})

// => start server
const startServer = () => {
  app.listen(port, () => console.log(`App started on port ${port}`)) // => use callback function
}

// => connection mongoose
const connectDb = () => {
  mongoose.Promise = require('bluebird')

  const options = {
    useMongoClient: true
  }

  mongoose.connect('mongodb://localhost/testmongoose', options)
  return mongoose.connection
}

// => connect mongoose
connectDb ()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer)

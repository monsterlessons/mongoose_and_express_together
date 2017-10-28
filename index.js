const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user')

const app = express()
app.get('/user', (req, res) => {
  User.findUserByName('alex', (err, user) => {
    res.json(user)
  })
})

const port = 3999
const startServer = () => {
  app.listen(port)
  console.log(`App started on port ${port}`)
}
const connectDb = () => {
  mongoose.Promise = require('bluebird')

  const options = {
    useMongoClient: true
  }

  mongoose.connect('mongodb://localhost/testmongoose', options)
  return mongoose.connection
}

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer)

// const mongoose = require('mongoose')
// const User = require('./models/user')
// mongoose.Promise = require('bluebird')
//
// mongoose.connect('mongodb://localhost/testmongoose', {
//   useMongoClient: true
// })
//
// const db = mongoose.connection
//
// db.on('error', err => {
//   console.log('error connection', err)
// })
//
// db.once('open', () => {
//   User.findUserByName('alex', (err, user) => {
//     console.log(err, user)
//     user.findSimilarUsersByCountry((err, users) => {
//       console.log(err, users)
//     })
//   })
// })

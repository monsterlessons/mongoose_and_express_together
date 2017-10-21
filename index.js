const mongoose = require('mongoose')
const User = require('./models/user')
mongoose.Promise = require('bluebird')

mongoose.connect('mongodb://localhost/testmongoose', {
  useMongoClient: true
})

const db = mongoose.connection

db.on('error', err => {
  console.log('error connection', err)
})

db.once('open', () => {
  User.findUserByName('alex', (err, user) => {
    console.log(err, user)
    user.findSimilarUsersByCountry((err, users) => {
      console.log(err, users)
    })
  })
})

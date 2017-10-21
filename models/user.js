const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: String,
  country: String
})

userSchema.statics.findUserByName = function (name, cb) {
  return this.findOne({name: new RegExp('alex', 'i')}, cb)
}

userSchema.methods.findSimilarUsersByCountry = function (cb) {
  return this.model('User')
    .where('country', this.country)
    .where('_id').ne(this._id)
    .exec(cb)
}

const User = mongoose.model('User', userSchema)

module.exports = User

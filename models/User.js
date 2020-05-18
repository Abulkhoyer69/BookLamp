const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
let UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  favoriteBook: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
})

UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email }).exec(function (err, user) {
    if (err) {
      return callback(err)
    } else if (!user) {
      let err = new Error('User not found')
      err.status = 401
      return callback(err)
    }

    bcrypt.compare(password, user.password, function (error, result) {
      if (result === true) {
        return callback(null, user)
      } else {
        return callback()
      }
    })
  })
}

UserSchema.pre('save', function (next) {
  let user = this
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err)
    } else {
      user.password = hash
      next()
    }
  })
})

let User = mongoose.model('User', UserSchema)

module.exports = User

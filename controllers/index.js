const User = require('../models/User')

const getHomeController = (req, res, next) => {
  return res.render('index', { title: 'Home' })
}

const getLoginController = (req, res, next) => {
  return res.render('login', { title: 'Login' })
}

const postLoginController = (req, res, next) => {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (
      error,
      user
    ) {
      if (error || !user) {
        let err = new Error('Wrong email or password')
        err.status = 401
        return next(err)
      } else {
        req.session.userId = user._id
        return res.redirect('/profile')
      }
    })
  } else {
    let err = new Error('Email and Password are required')
    err.status = 401
    return next(err)
  }
}

const getRegistrationController = (req, res, next) => {
  return res.render('register', { title: 'Register' })
}

const postRegistrationController = (req, res, next) => {
  if (
    req.body.email &&
    req.body.name &&
    req.body.favoriteBook &&
    req.body.password &&
    req.body.confirmPassword
  ) {
    if (req.body.password !== req.body.confirmPassword) {
      let err = new Error("Password doesn't match")
      err.status = 400
      return next(err)
    }

    let userInfo = {
      email: req.body.email,
      name: req.body.name,
      favoriteBook: req.body.favoriteBook,
      password: req.body.password,
    }

    User.create(userInfo, (err, user) => {
      if (err) {
        return next(err)
      } else {
        req.session.userId = user._id
        return res.redirect('/profile')
      }
    })
  } else {
    let err = new Error('All field required')
    err.status = 400
    return next(err)
  }
}

const getAboutController = (req, res, next) => {
  return res.render('about', { title: 'About' })
}

const getLogoutController = (req, res, next) => {
  if (req.session) {
    req.session.destroy( function(err) {
      if (err) {
        return next(err)
      } else {
        res.redirect('/')
      }
    })
  }
}

const getProfileController = (req, res, next) => {
  if (!req.session.userId) {
    let err = new Error('You are not authorized to view this page')
    err.status = 403
    return next(err)
  } else {
    User.findById(req.session.userId, function (error, user) {
      if (error) {
        return next(err)
      } else {
        return res.render('profile', {
          title: 'About',
          name: user.name,
          favorite: user.favoriteBook,
        })
      }
    })
  }
}

const getContactController = (req, res, next) => {
  return res.render('contact', { title: 'Contact' })
}

module.exports = {
  getHomeController,
  getAboutController,
  getContactController,
  getLoginController,
  postLoginController,
  getRegistrationController,
  postRegistrationController,
  getProfileController,
  getLogoutController,
}

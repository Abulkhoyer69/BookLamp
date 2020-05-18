const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {
  getHomeController,
  getAboutController,
  getContactController,
  getLoginController,
  postLoginController,
  getRegistrationController,
  postRegistrationController,
  getProfileController,
  getLogoutController,
} = require('../controllers/index')

// GET /
router.get('/', getHomeController)

// GET /
router.get('/login', getLoginController)

// GET /
router.get('/profile', getProfileController)

router.post('/login', postLoginController)

// GET /
router.get('/register', getRegistrationController)

router.get('/logout', getLogoutController)

router.post('/register', postRegistrationController)

// GET /about
router.get('/about', getAboutController)

// GET /contact
router.get('/contact', getContactController)

module.exports = router

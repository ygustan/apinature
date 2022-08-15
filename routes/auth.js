const express = require('express');
const router = express.Router();
const { ctrlLogin } = require('../controllers/index');


// Route :: Login
router.route('/login').post(ctrlLogin.login);

// Route :: Logout
router.route('/logout').post(ctrlLogin.logout);

module.exports = router;
const express = require('express');
const loginController = require('../controllers/loginController.js');

 const router = express.Router();

router.post('/login', loginController.login);

module.exports = router;


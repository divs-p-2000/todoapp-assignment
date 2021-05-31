const express = require('express');
const router = express.Router();
const { loadHome, login, loadRegistration, register } = require('../controllers/indexController');
const registerValidate = require('../validations/register');
const loginValidate = require('../validations/login');

router.get('/', loadHome);

router.post('/', loginValidate, login);

router.get('/register', loadRegistration);

router.post('/register', registerValidate, register);

module.exports = router;

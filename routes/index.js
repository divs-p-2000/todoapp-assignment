const express = require('express');
const router = express.Router();
const { loadHome, login, loadRegistration, register } = require('../controllers/indexController');
const registerValidate = require('../validations/register');

router.get('/', loadHome);

router.post('/', login);

router.get('/register', loadRegistration);

router.post('/register', registerValidate, register);

module.exports = router;

const express = require('express');
const router = express.Router();
const { loadHome, login, loadRegistration, register } = require('../controllers/indexController');

router.get('/', loadHome);

router.post('/', login);

router.get('/register', loadRegistration);

router.post('/register', register);

module.exports = router;

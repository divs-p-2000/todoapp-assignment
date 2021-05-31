const { body } = require('express-validator');

const loginValidate = [
    body('username').trim().isLength({min : 1}).escape().withMessage('Please enter your username')
    .isAlphanumeric().withMessage('Your username contains only numbers and letters'),
    
    body('password').trim().isLength({min : 1}).escape().withMessage('Please enter your password')
    .isAlphanumeric().withMessage('Your password contains only numbers and letters'),
];

module.exports = loginValidate;
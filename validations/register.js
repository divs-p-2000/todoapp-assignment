const { body } = require('express-validator');
const { checkExistingUser, confirmPasswordMatch } = require('../services/indexServices');

const registerValidate = [
    body('firstName').trim().isLength({min : 1}).escape().withMessage('First name is required.')
    .isAlphanumeric().withMessage('First name cannot have non-alphanumeric characters'),

    body('lastName').trim().isLength({min : 1}).escape().withMessage('Last name is required.')
    .isAlphanumeric().withMessage('Last name cannot have non-alphanumeric characters'),

    body('username').trim().isLength({min : 1}).escape().withMessage('Username is required.')
    .isAlphanumeric().withMessage('Username cannot have non-alphanumeric characters').custom(checkExistingUser),

    body('passwordRetype')
    .custom(confirmPasswordMatch)
    .isLength({min : 6}).withMessage('Password should be atleast 6 characters'),

    body('dateOfBirth', 'Invalid date of birth')
    .optional({checkFalsy: true}).isISO8601().toDate(),
];

module.exports = registerValidate;
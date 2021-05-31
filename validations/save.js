const { body } = require('express-validator');

const taskValidate = [
    body('title').trim().isLength({min : 1}).escape().withMessage('Please enter a title')
    .isAlphanumeric().withMessage('Title can contain only numbers and letters'),
    
    body('description').trim().escape(),
    
    body('date', 'Invalid date')
    .optional({checkFalsy: true}).isISO8601().toDate(),
];

module.exports = taskValidate;
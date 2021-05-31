const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');
const { saveUser } = require('../services/indexServices');

const loadHome = catchAsync(async (req, res) => {
    res.render('index');
});

const login = catchAsync(async (req, res) => {
    res.send('NOT YET IMPLEMENTED - / post');
});

const loadRegistration = catchAsync(async (req, res) => {
    res.render('register');
});

const register = catchAsync(async (req, res) => {
    const errors = await validationResult(req);

    if(!errors.isEmpty()){
        res.render('register', { errors: errors.array() });
    }

    else{
        await saveUser(req.body);
        res.render('index', { signinPrompt: true });
    }
});

module.exports = {
    loadHome,
    login,
    loadRegistration,
    register
};
const catchAsync = require('../utils/catchAsync');

const loadHome = catchAsync(async (req, res) => {
    res.render('index', { title: 'Express' });
});

const login = catchAsync(async (req, res) => {
    res.send('NOT YET IMPLEMENTED - / post');
});

const loadRegistration = catchAsync(async (req, res) => {
    res.send('NOT YET IMPLEMENTED - /register get');
});

const register = catchAsync(async (req, res) => {
    res.send('NOT YET IMPLEMENTED - /register post');
});

module.exports = {
    loadHome,
    login,
    loadRegistration,
    register
};
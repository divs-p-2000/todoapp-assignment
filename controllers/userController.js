const catchAsync = require('../utils/catchAsync');

const loadPage = catchAsync(async (req, res) => {
    res.send('NOT YET IMPLEMENTED - /user/:id get');
});

const saveTask = catchAsync(async (req, res) => {
    res.send('NOT YET IMPLEMENTED - /user/:id post');
});

module.exports = {
    loadPage,
    saveTask
};
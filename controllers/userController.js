const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');
const async = require('async');
const Task = require('../models/task');
const User = require('../models/user');
const { storeTask, removeTask } = require('../services/userServices');

const loadPage = catchAsync(async (req, res) => {
    async.parallel({
        user: function(next) {
            User.findById(req.params.id).exec(next);    
        },
        taskList: function(next) {
            Task.find({'user': req.params.id}).exec(next);
        },
    }, function (err, results) {
        if (err) { throw err };
        if (results.user == null){
            throw new Error('User not found');
        }

        res.render('dashboard', { user: results.user, tasks: results.taskList });
    });
});

const saveTask = catchAsync(async (req, res) => {
    const errors = await validationResult(req);

    if(!errors.isEmpty()){
        await loadPage(req, res);
    }
    else{
        await storeTask(req.body, req.params);
        res.redirect('/user/' + req.params.id);
    }
});

const deleteTask = catchAsync(async (req, res) => {

    console.log('Here');
    await removeTask(req.params);
    res.redirect('/user/' + req.params.id);
});

module.exports = {
    loadPage,
    saveTask,
    deleteTask
};
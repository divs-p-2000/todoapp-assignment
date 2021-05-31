const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');
const { saveUser, findUser } = require('../services/indexServices');

const loadHome = catchAsync(async (req, res) => {
    res.render('index');
});

const login = catchAsync(async (req, res) => {
    const errors = await validationResult(req);

    if(!errors.isEmpty()){
        res.render('index', {errors: errors.array()});
    }

    else{
        const user = await findUser({'username' : req.body.username});

        if (user) {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) throw err;
                if(isMatch){
                    res.redirect(user.url);
                }
                else{
                    res.render('index', { errors: [{msg :'Incorrect Password. Try again.'}] });
                }
            });
        }
        else{
            res.render('index', { errors: [{msg :'The user does not exist.'}] });
        }
    }

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
        res.redirect('/');
    }
});

module.exports = {
    loadHome,
    login,
    loadRegistration,
    register
};
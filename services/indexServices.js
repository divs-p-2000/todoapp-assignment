const User = require('../models/user');

const saveUser = async (params) => {
    var user = new User(
        {
            username: params.username,
            password: params.password,
            firstName: params.firstName,
            lastName: params.lastName,
            dateOfBirth: params.dateOfBirth,
        }
    );
    await user.save(function (err) {
        if (err) { throw new Error(err); }
    })
};

const checkExistingUser = async (username) => {
    const user = await findUser({'username' : username});

    if(user){
        throw new Error('Username is already taken');
    }
    return true;
};

const confirmPasswordMatch = async (candidatePwd, {req}) => {
    if(candidatePwd !== req.body.password){
        throw new Error('Passwords do not match!');
    }
    return true;
};

const findUser = async function (params) { 
    try {
        return await User.findOne(params);
    } 
    catch(err) { 
        console.log(err);
    }
}

module.exports = {
    findUser,
    saveUser,
    checkExistingUser,
    confirmPasswordMatch,
};
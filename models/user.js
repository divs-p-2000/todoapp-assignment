const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {type: String, required: true, index: {unique : true}},
        password: {type: String, required: true},
        firstName: {type: String, required: true, maxLength: 100},
        lastName: {type: String, required: true, maxLength: 100},
        dateOfBirth: {type: Date, required: true},
    }
);

// get user's full name
UserSchema.virtual('name').get(function (){
    return this.firstName + ' ' + this.lastName;
});

// facility for unique user routes
UserSchema.virtual('url').get(function (){
    return '/user/' + this.id;
});

// hash and store
UserSchema.pre('save', function (next){
    var user = this;
    
    // hashed only is it is modified or new
    if(!user.isModified('password')) return next();

    // salt generated here
    bcrypt.genSalt(SALT_ROUNDS, function (err, salt){
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err,hash){
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

// compare passwords
UserSchema.methods.comparePassword = function (receivedPassword, callback){
    bcrypt.compare(receivedPassword, this.password, function (err, isMatch){
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
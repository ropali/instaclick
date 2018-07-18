const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    fullName : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        default: 'male'
    },
    profile:{
        type: String,
        default: '/images/person.png'
    },
    bio: {
        type: String,
        default: 'Hey there, I\'m using InstaClick.It is amazing!'
    }
});


userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}


userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);
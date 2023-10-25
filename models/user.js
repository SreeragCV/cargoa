const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'vendor']
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    mail: {
        type: String,
        required: [true, 'Please provide a mail']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    },
   
})

module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose')
const {isEmail} = require('validator')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        // validate to make sure it is an email that is posed and not random string
        validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimun password length is 6 characters']
    },
})

// creating model, name NEEDS to be singular of the db name
const User = mongoose.model('user', userSchema)

module.exports = User
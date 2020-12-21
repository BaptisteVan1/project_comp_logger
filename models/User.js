const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')


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


// fire a function before doc saved to db
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    // this = instance of the user we're creating
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


// creating model, name NEEDS to be singular of the db name
const User = mongoose.model('user', userSchema)

module.exports = User
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' }
    
    // incorrect email
    if (err.message === 'incorrect email'){
        errors.email = 'that email is not registered'
        return errors
    }

    // incorrect password
    if (err.message === 'incorrect password'){
        errors.password = 'that password is not registered'
        return errors
    }

    // duplicate error
    if (err.code === 11000) {
        errors.email = 'that email is already registered'
        return errors
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }

// value of 3 days in seconds
const maxAge = 3*24*60*60


// creating a token that will be used to check if user is logged in
const createToken = (id) => {
    //secret to be changedand stored somewhere else. NOT SAFE
    return jwt.sign({id}, process.env.SECRET, {
        expiresIn: maxAge
    })
}

// rendering the signup page
module.exports.signup_get = (req, res) => {
    res.render('signup')
}


// rendering the login page
module.exports.login_get = (req, res) => {
    res.render('login')
}

// managing the signup process (catching posted data and processing it)
module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body
    // creating new user in DB
    try {
        const user = await User.create({email, password})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: user._id})
        console.log('New user created')
    } catch(err){
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}
// once user is created, a token will be created as well, with a lifespan of 3 days, 
//that will be sent as cookie for later verification

module.exports.login_post =  async(req, res) => {
    const { email, password } = req.body
    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json({user: user._id})
    } catch(err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}
// this serves to create and send a token in a cookie after the login


module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/') 
}
// here we replace the login token by another one with a lifespan of 1 milisecond that is empty and then redirect to home
// as token is replaced then deleted, user is logged out because server can't read it's token with matching secret
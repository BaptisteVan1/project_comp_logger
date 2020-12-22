const User = require('../models/User')
const jwt = require('jsonwebtoken')

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
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

const createToken = (id) => {
    //secret to be changedand stored somewhere else. NOT SAFE
    return jwt.sign({id}, 'my secret', {
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

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

module.exports.login_post = (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    res.post('user login')
}
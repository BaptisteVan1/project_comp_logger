const User = require('../models/User')

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
        res.status(201).json(user)
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
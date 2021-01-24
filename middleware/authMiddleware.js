const jwt = require('jsonwebtoken')
const User = require('../models/User')

// securing routes for logged in users only
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    //check if tocken exists and is valid
    //change secret here HUGE SAFETY GAP
    if(token){
        jwt.verify(token, process.env.SECRET, (err, decodedToken) =>{
            if(err){
                console.log(err.message)
                res.redirect('/login')
            }else{
                console.log(decodedToken)
                next()
            }
        })
    }else{
        res.redirect('/login')
    }
}

//check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    // verifying if token exists
    if(token){
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) =>{
            if(err){
                console.log(err.message)
                // to avoid having a server side error
                res.locals.user = null
                // nothing else to do here let's move on
                next()
            }else{
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                // passing user into the view to output it in the header
                res.locals.user = user
                next()
            }
        })
    }else{
        res.locals.user = null
        next()
    }
}

module.exports = {requireAuth, checkUser}
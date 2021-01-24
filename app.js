const express = require('express')
const mongoose = require('mongoose')
const InitiateMongoServer = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const compRoutes = require('./routes/compRoutes')
const compDisplayRoutes = require('./routes/compDisplayRoutes')
const cookieParser = require('cookie-parser')
const {requireAuth, checkUser} = require('./middleware/authMiddleware')
const helmet = require('helmet')

const app = express()

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
// middleware for XSS -> check the rest later
app.use(helmet.xssFilter())

// port
app.listen(5000, () => console.log('App listening on port 5000'))

// view engine
app.set('view engine', 'ejs')

// database connection
InitiateMongoServer()

// routes
// I want to check user on every route so I use *
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'))
app.use(authRoutes)
app.use(requireAuth, compRoutes)
app.use(requireAuth, compDisplayRoutes)
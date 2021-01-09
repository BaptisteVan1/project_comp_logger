const express = require('express')
const mongoose = require('mongoose')
const InitiateMongoServer = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const compRoutes = require('./routes/compRoutes')
const cookieParser = require('cookie-parser')
const {requireAuth, checkUser} = require('./middleware/authMiddleware')

const app = express()

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

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
app.get('/comps', requireAuth, (req, res) => res.render('comp'))
app.use(authRoutes)
app.use(requireAuth, compRoutes)
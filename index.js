const express = require('express')
const mongoose = require('mongoose')
const InitiateMongoServer = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')

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
app.get('/', (req, res) => res.render('home'))
app.get('/comps', (req, res) => res.render('comp'))
app.use(authRoutes)
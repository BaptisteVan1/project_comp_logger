const express = require('express')
const bodyParser = require('body-parser')
const InitiateMongoServer = require('./config/db')
const user =require('./routes/user')


const app = express()
app.use(bodyParser.json())

// port
app.listen(3000, () => console.log('App listening on port 3000'))

// initiate Mongo server
InitiateMongoServer()


app.get('/', (req, res) => {
    res.json({message: 'API Working!'})
})


// importing user route
app.use('/user', user)
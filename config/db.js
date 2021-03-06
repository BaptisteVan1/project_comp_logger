// config the connection to mongo db

const mongoose = require("mongoose")
// env variables
require('dotenv').config()

const dbURI = process.env.ATLAS_URI //check DB name here!!!

mongoose.connect(dbURI,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})

const InitiateMongoServer = async() => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true
        })
        console.log('Connected to DB!')
    } catch (e) {
        console.log(e)
        throw e
    }
}

module.exports = InitiateMongoServer
// config the connection to mongo db

const mongoose = require("mongoose")

const dbURI = 'mongodb+srv://Baptiste:<password>@cluster0.zf3t6.mongodb.net/<dbname>?retryWrites=true&w=majority'

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
const mongoose = require('mongoose')

// model for competitions to be loaded by users
const compSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter a competitionname'],
        unique: true,
    },
    city:{
        type: String,
        required: [true, 'Please enter a city']
    },
    country:{
        type: String,
        required: [true, 'Please enter a country']
    },
    price:{
        type: Number,
        required: [true, 'Please enter a price']
    },
    currency:{
        type: String,
        required: [true, 'Please enter a currency'],
        uppercase: true,
        minlength:[3, 'Please enter a 3 letters currency code'],
        maxlength:[3, 'Please enter a 3 letters currecny code']
    },
    date:{
        type: Date,
        required: [true, 'Please enter a date']
    }
})



const Competition = mongoose.model('competition', compSchema)

module.exports = Competition
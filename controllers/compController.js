const { requireAuth } = require("../middleware/authMiddleware")
const Competition = require("../models/Competitions")

// rendering the comp register page
module.exports.newcomp_get = (req, res) => {
    res.render('new-comp')
}

// managing the comp save process
module.exports.newcomp_get_post = async (req, res) => {
    const {name, city, country, price, currency, date} = req.body
    //creating a new comp in DB
    try{
        const nComp = await Competition.create({name, city, country, price, currency, date})
        res.status(201).json({competition: competition._id})
        console.log('New competition added')
    }catch(err){
        // const errors = handleErrors(Err)
        // res.status(400).json(errors)
        console.log(err)
    }
}

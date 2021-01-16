const Competition = require("../models/Competitions")

// handle errors
const handleCompErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {
        name:'',
        city:'',
        country:'',
        price:'',
        currency:'',
        date:'',
    }

    // duplicate error
    if (err.code ===11000) {
        error.name = 'that competition is already registered'
        return errors
    }
}


// rendering the comp register page
module.exports.newcomp_get = (req, res) => {
    res.render('new-comp')
}

// managing the comp save process
// need to implement a redirect upont submit
// need to manage errors
module.exports.newcomp_post = async (req, res) => {
    const {name, city, country, price, currency, date} = req.body
    //creating a new comp in DB
    try{
        const nComp = await Competition.create({name, city, country, price, currency, date})
        // line below needed so we can later redirect user
        // success page from the template
        res.status(201).json({nComp: nComp._id})
        console.log('New competition added')
        console.log(nComp)
    }catch(err){
        // const errors = handleErrors(Err)
        // res.status(400).json(errors)
        console.log(err)
    }
}

// redering the comp display page
const Competition = require('../models/Competitions')


module.exports.comp_display_get = (req, res) =>{
    Competition.find()
        .then(result => {
            console.log(result)
            res.render('comp')
        })
        .catch(err => {
            console.log(err)
        })
    // res.render('comp')
}
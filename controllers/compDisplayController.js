// redering the comp display page
const Competition = require('../models/Competitions')


module.exports.comp_display_get = (req, res) =>{
    Competition.find()
        .then(result => {
            res.render('comp', {competitions: result})
        })
        .catch(err => {
            console.log(err)
        })
}
const { Router } = require('express')
const compDisplayController = require('../controllers/compDisplayController')

const router = Router()

router.get('/comps', compDisplayController.comp_display_get)

module.exports = router
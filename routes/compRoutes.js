const { Router } = require('express')
const compController = require('../controllers/compController')

const router = Router()

router.get('/new-comp', compController.newcomp_get)

module.exports = router
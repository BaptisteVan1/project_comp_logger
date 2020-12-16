const { Router } = require('express')
const authControler = require('../controllers/authController')

const router = Router()

router.get('/signup', authControler.signup_get)
router.get('/login', authControler.login_get)
router.post('/signup', authControler.signup_post)
router.post('/login', authControler.login_post)



module.exports = router
const router = require('express').Router()
const userController = require('../../controller/user/userController')

router.post('/register', userController.register)
router.post('/login', userController.login)
// router.put('/updateUser/:id', userController.update)

module.exports = router
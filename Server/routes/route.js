const router = require('express').Router()
const userRoutes = require('../routes/user/user.routes')
// const voucherRoutes = require('./productRoutes')

router.use('/user', userRoutes)
// router.use('/voucher', voucherRoutes)

module.exports = router
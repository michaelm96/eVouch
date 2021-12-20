const router = require('express').Router()
const userRoutes = require('./user/user.routes')
const voucherRoutes = require('./voucher/voucher.routes')

router.use('/user', userRoutes)
router.use('/voucher', voucherRoutes)

module.exports = router
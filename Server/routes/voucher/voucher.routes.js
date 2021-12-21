const router = require('express').Router()
const voucherController = require('../../controller/voucher/voucherController')
const authentication = require('../../helper/authentication')

router.use(authentication)
router.get('/', voucherController.getAll)
router.get('/userVoucher/:id', voucherController.getUserVoucher)
router.get('/verify', voucherController.verifyByTitle)
router.get('/payMethodList', voucherController.paymentMethodList)
router.get('/:id', voucherController.getById)
router.post('/', voucherController.insert)
router.post('/checkout', voucherController.checkout)
router.post('/payment', voucherController.makePayment)
router.put('/used', voucherController.useVoucher)
router.put('/status/:id', voucherController.changeStatus)
router.put('/:id', voucherController.editVoucher)

module.exports = router
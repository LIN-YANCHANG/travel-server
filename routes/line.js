const router = require('express').Router()
const Controllers = require('../controllers')

router.post('/reserve', Controllers.linepay.CreateLinepay)

router.post('/confirm', Controllers.linepay.ConfirmLinepay)

router.put('/refund', Controllers.linepay.RefundLinepay)

router.get('/search', Controllers.linepay.SearchLinepay)

module.exports = router
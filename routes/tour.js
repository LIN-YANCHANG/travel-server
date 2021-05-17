const router = require('express').Router()

const Controllers = require('../controllers')

// 查詢帳號
router.get('/user', Controllers.member.ViewAll)
// 新增帳號
router.post('/user', Controllers.member.CreateUser)
// 修改帳號
router.put('/user/:userId', Controllers.member.UpdateUser)
// 登入
router.post('/user/login', Controllers.member.LoginUser)

module.exports = router
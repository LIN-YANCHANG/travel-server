const express = require('express')
const fs = require('fs')
const path = require('path')

const Routes = express.Router()

// path.resolve 抓更目錄
Routes.use(express.static(path.resolve('dist')))

Routes.use('*', (req, res) => {
    let html = fs.readFileSync(path.resolve('dist/index.html'), 'utf-8')
    res.send(html)
})

module.exports = Routes
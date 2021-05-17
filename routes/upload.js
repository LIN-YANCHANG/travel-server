const express = require('express')
const fs = require('fs')

const Routes = express.Router()

Routes.use(express.static('dist'))

Routes.use('*', (req, res) => {
    let html = fs.readFileSync('../dist/index.html', 'utf-8')
    res.send(html)
})

Routes.get('/taipei', (req, res) => {
    res.sendStatus(200)
})


module.exports = Routes
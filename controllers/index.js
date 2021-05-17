const router = require('express').Router()
const sequelize = require('../models')
const tools = require('../time')
const nodemailer = require('nodemailer')
const QRCode = require('qrcode')
const inlineBase64 = require('nodemailer-plugin-inline-base64');
const fs = require('fs')
const controllers = {}

fs
    .readdirSync(__dirname)
    .filter(name => name !== 'index.js')
    .forEach(name => {
        let route = name.replace('.js', '')
        controllers[route] = require(`./${name}`)(sequelize, tools, nodemailer, QRCode, inlineBase64)
    })

module.exports = (router, controllers)
const axios = require('axios')
const { raw } = require('express')
module.exports = (sequelize, tools, nodemailer, QRCode, inlineBase64) => {
    const { linepay } = sequelize
    const { GetAll } = tools
    return {
        CreateLinepay: async (req, res) => {
            // console.log(req.body)

            try {
                const reserve = (await axios({
                    method: 'post',
                    url: "https://sandbox-api-pay.line.me/v2/payments/request",
                    headers: {
                        "Content-Type": "application/json",
                        "X-LINE-ChannelId": "1653656358",
                        "X-LINE-ChannelSecret": "f237af2c6c282be2a6195bde9c2f0bf6"
                    },
                    data: req.body
                })).data

                if (reserve.returnCode == 0000) return res.json(reserve)
                else return res.json(reserve)
            } catch (error) {
                // console.log(error)
                return res.json({ error: 400, message: "系統錯誤" })
            }
        },

        ConfirmLinepay: async (req, res) => {
            const time = GetAll()
            const { transactionId, orderId, amount, userId, StartTime, productName, payType, account } = req.query
            const lineData = { orderId: orderId, transactionId: transactionId, userId: userId, productName: productName, amount: amount, payType: payType, StartTime: StartTime, CreateTime: time }
            try {
                const confirm = (await axios({
                    method: 'post',
                    url: `https://sandbox-api-pay.line.me/v2/payments/${transactionId}/confirm`,
                    headers: {
                        "X-LINE-ChannelId": "1653656358",
                        "X-LINE-ChannelSecret": "f237af2c6c282be2a6195bde9c2f0bf6"
                    },
                    data: req.body
                })).data
                if (confirm.returnCode == 0000) {
                    try {
                        const confirm_data = await linepay.create(lineData)
                        // console.log(confirm_data)
                        const transporter = nodemailer.createTransport({
                            service: 'Gmail',
                            auth: {
                                user: "apple65650505@gmail.com",
                                pass: "zx145236478569"
                            }
                        })


                        let stringdata = `https://taipei-tour.herokuapp.com/taipei/qrcode?productName=${productName}&StartTime=${StartTime}`
                        console.log(stringdata)
                        transporter.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' }));
                        // qrcode
                        const qrcode = await (new Promise((resolve, rej) => {
                            QRCode.toDataURL(stringdata, function (err, code) {
                                if (err) {
                                    rej()
                                    return console.log("error occurred")
                                }
                                // Printing the code
                                resolve(code)
                            })
                        }))
                        // email內容
                        const options = {
                            from: "apple65650505@gmail.com",
                            to: `${account}`,
                            subject: "台北旅遊",
                            text: "訂票資訊",
                            html: `<h1>${productName}</h1><p>出發日期：${lineData.StartTime}</p><p>購票成功</p><img src="${qrcode}">`,
                        }
                        transporter.sendMail(options, function (error, info) {
                            if (error) console.log(error)
                            else console.log(`訊息發送:${info.response}`)
                        })

                        return res.json({ info: confirm_data, message: "交易成功" })
                    } catch (error) {
                        console.log(error)
                        return res.json({ error: 400, message: "系統錯誤" })
                    }
                }
                else return res.json({ error: 400, message: "交易失敗" })
            } catch (error) {
                return res.json(error)
            }
        },
        RefundLinepay: async (req, res) => {
            const time = GetAll()
            const { transactionId } = req.body
            try {
                const refund = (await axios({
                    method: "post",
                    url: `https://sandbox-api-pay.line.me/v2/payments/${transactionId}/refund`,
                    headers: {
                        "Content-Type": "application/json",
                        "X-LINE-ChannelId": "1653656358",
                        "X-LINE-ChannelSecret": "f237af2c6c282be2a6195bde9c2f0bf6"
                    },
                })).data
                // console.log(req.body)
                console.log(time)
                if (refund.returnCode == 0000) {
                    try {
                        await linepay.update({ RefundTime: time }, { where: { transactionId } })
                        return res.json({ message: "退款成功", success: true })
                    } catch (error) {
                        return res.json({ error: 400, message: "系統錯誤" })
                    }
                }
                if (refund.returnCode == 1165) return res.json({ error: 400, message: "該筆交易已退款" })
            } catch (error) {
                return res.json(error)
            }
        },
        SearchLinepay: async (req, res) => {
            try {
                const searchInfo = await linepay.findAll({ where: { RefundTime: 0 }, raw: true })
                console.log(searchInfo)
                return res.json({ searchInfo, message: "查詢成功" })
            } catch (error) {
                return res.json({ error: 400, message: "系統錯誤" })
            }
        }
    }
}
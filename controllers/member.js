const CryptoJS = require('crypto-js')
module.exports = (sequelize, tools) => {
    const { member } = sequelize
    const { GetAll, GetNo } = tools
    const key = CryptoJS.enc.Utf8.parse("bbbbbbbbbbbzxcxbbbbb")
    let Enaes = CryptoJS.AES.encrypt("journey", key, {
        mode: CryptoJS.mode.ECB
    }).ciphertext.toString()
    // let base64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(Enaes))
    // let deaes = CryptoJS.AES.decrypt(base64,key,{
    //     mode:CryptoJS.mode.ECB
    // }).toString(CryptoJS.enc.Utf8)
    // console.log(Enaes)
    // console.log(deaes)
    return {
        ViewAll: async (req, res) => {
            if (!req.get('TP-TOKEN')) return res.json({ message: "請輸入token" })
            try {
                const member_data = await member.findAll()
                // (new Promise((resolve, rej) => {
                //     resolve('123')
                // }))
                return res.json({ member_data, success: true })
            } catch (error) {
                return res.json({ error: 400, message: "系統錯誤" })
            }
        },
        CreateUser: async (req, res) => {
            const Info = req.body
            const number = GetNo()
            const time = GetAll()
            try {
                await member.create({ userNo: number, token: Enaes, createTime: time, ...Info })
                return res.json({ success: true, message: "註冊成功" })
            } catch (error) {
                console.log(error)
                return res.json({ error: 400, message: "系統錯誤" })
            }
        },
        UpdateUser: async (req, res) => {
            const { userId } = req.params
            const pwd = req.body
            const time = GetAll()
            if (!req.get('TP-TOKEN')) return res.json({ message: "請輸入token" })
            const password = pwd.old
            const newPassword = pwd.new
            const [member_data] = await member.findAll({ where: { password }, raw: true })
            if (password != member_data.password) return res.json({ error: 400, message: "舊密碼錯誤" })
            try {
                await member.update({ updateTime: time, password: newPassword }, { where: { userId } })
                return res.json({ success: true, message: "更改成功" })
            } catch (error) {
                return res.json({ error: 400, message: "系統錯誤" })
            }
        },
        LoginUser: async (req, res) => {
            const { account, password } = req.body
            try {
                const member_data = await member.findAll({ where: { account, password }, raw: true })
                if (!member_data.length) return res.json({ error: 400, message: "帳號或密碼錯誤" })
                const [Val] = member_data
                return res.json({ token: Val.token, userId: Val.userId, userName: Val.userName, account: Val.account, success: true, message: "登入成功" })
            } catch (error) {
                console.log(error)
                return res.json({ error: 400, message: "系統錯誤" })
            }
        }
    }
}
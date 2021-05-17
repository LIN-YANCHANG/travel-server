const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)

const server = app.listen(process.env.PORT || 5000, () => {
    const PORT = server.address().port
    console.log(`Server is running on port:${PORT}`)
})

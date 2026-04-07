const express = require('express');
const cookie_parser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(cookie_parser())

// importing all routers
const authRouter = require("./routes/auth.routes")

// router
app.use('/api/auth', authRouter)


module.exports = app
const express = require('express');
const cookie_parser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookie_parser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

// importing all routers
const authRouter = require("./routes/auth.routes")

// router
app.use('/api/auth', authRouter)


module.exports = app
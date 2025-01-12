require('dotenv').config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const router = require('./router/routes')
const errorMiddleware = require('./middlewares/error-middleware')

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
router(app)
app.use(errorMiddleware)

const start = async () => {
    try {
        app.listen(PORT, () =>  console.log(`server started on PORT = ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}

start()

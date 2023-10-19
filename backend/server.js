const express = require('express')
const colors = require('colors')
const { errorHandler } = require('./middleware/middleware')
const connectDB = require('./database/db')
const cors = require('cors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/user', require('./routes/UserRouter'))
app.use('/api/admin', require('./routes/AdminRouter'))
app.use('/api/accident-report', require('./routes/AccidentReportRouter'))
app.use('/api/solved-accident', require('./routes/AccidentReportAnalytics'))
app.use('/api/crime-report', require('./routes/CrimeReportRouter'))
app.use('/api/solved-crime', require('./routes/CrimeReportAnalytics'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
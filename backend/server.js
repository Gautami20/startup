const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db.config')
const authRoutes = require('./routes/auth.routes')
const startupRoutes = require('./routes/startup.routes')
const investmentRoutes = require('./routes/investment.routes')
const cors = require('cors')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: false }))

connectDB()

app.use(authRoutes)

app.use(startupRoutes)

app.use(investmentRoutes)

app.listen(PORT, () => {
  console.log('Server is listening on port')
})

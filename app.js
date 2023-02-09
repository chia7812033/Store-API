require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddlewate = require('./middleware/error-handler')

const productsRouter = require('./routes/products')

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href=="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddlewate)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    // Connct to MongoDB
    connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening at port ${port}`))
  } catch (error) {
    console.log(error);
  }
}

start()

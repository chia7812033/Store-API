require('dotenv').config()


const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddlewate = require('./middleware/error-handler')

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href=="/api/v1/products">products route</a>')
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddlewate)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    // Connct to MongoDB
    app.listen(port, console.log(`Server is listening at port ${port}`))
  } catch (error) {
    console.log(error);
  }
}

start()

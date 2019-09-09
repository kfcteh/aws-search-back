require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const productController = require('./contollers/product')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 5000

app.post('/products', productController.create)
app.get('/products', productController.getAll)

app.use((err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500
  }
  res.status(err.statusCode).send(err.message)
})


app.listen(port, () => console.log(`App listening on port ${port}!`))
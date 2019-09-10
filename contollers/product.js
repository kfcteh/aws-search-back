const { awsScraper } = require('../services/aws-scraper')
const { upsertProduct, getAllProducts } = require('../services/db')

const create = async (req, res, next) => {
  try {
    const productInfo = await awsScraper(req.body.asin)
    await upsertProduct(productInfo)
    res.status(201).send(productInfo)
  } catch (err) {
    next(err)
  }
}

const getAll = async (req, res) => {
  const result = await getAllProducts()
  res.send(result)
}

module.exports = {
  create,
  getAll
}
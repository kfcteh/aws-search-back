const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
  host: process.env.ELASTIC_SEARCH_CLIENT_URL,
  log: 'trace'
})

const upsertProduct = async (productInfo) => {
  const { id, category, dimensions, rank } = productInfo
  await client.update({
    index: 'products-index',
    type: 'product',
    id,
    body: {
      script: 'ctx._source.counter += 1',
      upsert: {
        category,
        dimensions,
        rank,
        timestamp: (new Date()).toUTCString(),
        counter: 1
      }
    }
  })
}

const getAllProducts = async () => {
  const response = await client.search({
    index: 'products-index',
    body: {
      query: {
        "match_all": {}
      }
    }
  })
  const results = response.hits.hits
  return results.map((result) => ({
    id: result._id,
    category: result._source.category,
    rank: result._source.rank,
    dimensions: result._source.dimensions
  }))
}

module.exports = { upsertProduct, getAllProducts }
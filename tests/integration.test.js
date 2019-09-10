
const request = require('supertest');
const app = require('../index')

describe('POST /products', () => {
  it('respond with json containing product to add', () => {
    return request(app)
      .post('/products')
      .send({ asin: 'B002QYW8LW' })
      .expect(201)
      .then(response => {
        expect(response.body.id).toEqual('B002QYW8LW')
      })
  })
})

describe('GET /products', () => {
  it('respond with json containing a list of products', () => {
    return request(app)
      .get('/products')
      .expect(200)
      .then(response => {
        const products = response.body
        expect(products.some((product) => product.id == 'B002QYW8LW')).toEqual(true)
      })
  })
})








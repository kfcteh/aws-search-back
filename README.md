# Backend API for aws asin product search

An Elastic Search Service URL is required

To create the products-index in elastic search send a PUT request to https://elastic_search_client/products-index

## To run integration tests:

ELASTIC_SEARCH_CLIENT_URL=https://elastic_search_client PORT=5000 npm run test integration.test.js

## To run locally:

Make sure .env file is created with the variables listed in the .env-template file

`npm run dev` to start

### Frontend Repo
https://github.com/kfcteh/aws-search-front

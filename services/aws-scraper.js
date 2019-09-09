const axios = require('axios')
const cheerio = require('cheerio')

const getCategory = (parsedHtml) => {
  const categoryText = parsedHtml('#wayfinding-breadcrumbs_feature_div ul li:last-child a').text()
  return categoryText.replace(/\n|\r/g, "").trim()
}

const getDimensions = (html) => {
  const dimensionsHtmlRegex = /Product Dimensions[^]*? inches/g
  const dimensionsRegex = /[\d\.]+ x [\d\.]+ x [\d\.]+ inches/g
  const htmlContainingdimensions = html.match(dimensionsHtmlRegex)
  if (!htmlContainingdimensions) {
    return null
  }
  return htmlContainingdimensions[0].match(dimensionsRegex) ? htmlContainingdimensions[0].match(dimensionsRegex)[0] : null
}

const getRank = (html) => {
  const rankHtmlRegex = /Best Sellers Rank[^]*#[\d,]+ in/g
  const rankRegex = /#([\d,]+)/g
  const htmlContainingRanks = html.match(rankHtmlRegex) ? html.match(rankHtmlRegex)[0] : null
  if (!htmlContainingRanks) {
    return null
  }
  const ranks = rankRegex.exec(htmlContainingRanks)
  return ranks ? ranks[1] : null
}

const awsScraper = async (asin) => {
  let html = null
  try {
    const result = await axios.get(`https://www.amazon.com/dp/${asin}`)
    html = result.data
  } catch (err) {
    console.error(`Unable to get Data for asin ${asin} from Amazon`)
    const error = new Error(`Unable to get Data for asin ${asin} from Amazon`)
    error.statusCode = 400
    throw error
  }
  const parsedHtml = cheerio.load(html)
  const category = getCategory(parsedHtml)
  const dimensions = getDimensions(html)
  const rank = parseInt(getRank(html))
  return {
    id: asin,
    category,
    dimensions,
    rank
  }
}

module.exports = { awsScraper }
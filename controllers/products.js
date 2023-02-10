const Product = require('../models/product')


const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort('createAt')
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  const {
    name,
    featured,
    company,
    sort,
    fields,
    numericFilters } = req.query
  const limit = req.query.limit || 10
  const page = req.query.page || 1
  const skip = (page - 1) * limit
  const queryObject = {}
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  if (company) {
    queryObject.company = company
  }
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '<': '$lt',
      '>=': '$gte',
      '<=': '$lte',
      '=': '$eq'
    }
    const regEx = /\b(<|>|>=|<=|=)\b/g
    let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
    const options = ['price', 'rating']
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-')
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }
      }
    })
  }
  let result = Product.find(queryObject)
  if (sort) {
    result = result.sort(sort.replaceAll(',', ' '))
  } else {
    result = result.sort('createAt')
  }
  if (fields) {
    result = result.select(fields.replaceAll(',', ' '))
  }
  result = result.skip(skip).limit(Number(limit))
  const products = await result
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
}

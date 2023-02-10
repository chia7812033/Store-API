const Product = require('../models/product')


const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({
    featured: true
  })
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  console.log(req.query)
  const { name: productName, featured: productFeatured, company: productCompany, sort } = req.query
  const queryObject = {}
  if (productFeatured) {
    queryObject.featured = productFeatured === 'true' ? true : false
  }
  if (productName) {
    queryObject.name = { $regex: productName, $options: 'i' }
  }
  if (productCompany) {
    queryObject.company = productCompany
  }
  let result = Product.find(queryObject)
  if (sort) {
    result = result.sort(sort.replace(',', ' '))
  } else {
    result = result.sort('createAt')
  }
  const products = await result
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
}

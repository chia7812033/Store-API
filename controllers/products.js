
const getAllProductsStatic = async (req, res) => {
  res.status(200).send({msg: "Get all products testing STATIC"})
}

const getAllProducts = async (req, res) => {
  res.status(200).send({msg: "Get all products testing"})
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
}

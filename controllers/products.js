const Product = require("../models/product");
const User = require("../models/user");

module.exports.CreateProduct = async (req, res) => {
  const { name, quantity, shippingDate, vendorname } = req.body;
  const vendor = await User.findOne({ username: vendorname });
  if (vendor.role === "vendor") {
  const product = new Product({ name, quantity, shippingDate });
  product.vendorID = vendor
  res.send(product)
  } else {
    res.status(400).json('CHOOSE A PROPER VENDOR');
  }
};
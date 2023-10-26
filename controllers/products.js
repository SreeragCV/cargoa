const Product = require("../models/product");
const User = require("../models/user");

module.exports.CreateProduct = async (req, res) => {
  try {
    const { name, quantity, shippingDate, vendorname } = req.body;
    const vendor = await User.findOne({ username: vendorname });
    const currentUser = await User.findOne({ email: req.user.email });
    if (vendor.role === "vendor") {
      if (req.user.role === "user") {
        const product = new Product({ name, quantity, shippingDate });
        product.vendorID = vendor;
        product.userID = currentUser;
        res.send(product);
        await product.save();
      } else {
        res.status(400).json("YOU ARE NOT A USER");
      }
    } else {
      res.status(400).json("CHOOSE A PROPER VENDOR");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

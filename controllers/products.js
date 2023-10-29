const Product = require("../models/product");
const User = require("../models/user");
const Notification = require("../models/notification");
const { notificationMessage } = require("./notification");


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
        await product.save();
        notificationMessage(currentUser, product);
        res.send(product);
      } else {
        res.status(400).json("ONLY USER CAN ORDER A PRODUCT");
      }
    } else {
      res.status(400).json("CHOOSE A PROPER VENDOR");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


module.exports.getProducts = async(req, res) => {
  console.log(req.user);
  if(req.user.role === "user"){
    const userProducts = await Product.find({userID: req.user.id});
    return res.send(userProducts)
  } else if(req.user.role === "vendor"){
    const vendorProducts = await Product.find({vendorID: req.user.id});
    return res.send(vendorProducts)
  }
}
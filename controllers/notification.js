const Notification = require("../models/notification");
const Product = require("../models/product");
const User = require("../models/user");

module.exports.notificationMessage = async (currentUser, product) => {
  try {
    const notify = new Notification({
      message: `${currentUser.username}, notified you!`,
    });
    notify.userID = currentUser;
    notify.purchaseID = product;
    notify.save();
  } catch (err) {
    console.log(err);
  }
};

const checkProducts = (products) => {
  const verify = products.filter((product) => {
    const one = product.shippingSchedule1;
    const two = product.shippingSchedule2;
    const three = product.shippingSchedule3;
    return one === undefined && two === undefined && three === undefined;
  });
  return verify;
};

module.exports.responseNotification = async (req, res) => {
  try{
  const { id } = req.params;
  const { shippingSchedule1, shippingSchedule2, shippingSchedule3 } = req.body;
  const user = await User.find({ email: req.user.email });
  const verifiedProducts = await Product.find({
    vendorID: id,
    userID: user[0]._id,
  });
  const verify = checkProducts(verifiedProducts);
  if (verify.length > 0) {
    if (verifiedProducts.length > 0) {
      verify.map(async (e) => {
        const data = await Product.findByIdAndUpdate(e._id, {
          shippingSchedule1,
          shippingSchedule2,
          shippingSchedule3,
        });
      });
    } else {
      res.status(401).json("NOT A VERIFIED VENDOR");
    }
  } else {
    res.status(501).json("ALREADY UPDATED");
  }
} catch(e){
  res.status(400).json('ERROR...', e)
}
};

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
  if (products.length > 0) {
    const one = products[0].shippingSchedule1;
    const two = products[0].shippingSchedule1;
    const three = products[0].shippingSchedule1;
    if (one === undefined && two === undefined && three === undefined) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports.responseNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { shippingSchedule1, shippingSchedule2, shippingSchedule3 } =
      req.body;
    const user = await User.find({ email: req.user.email });
    const verifiedProduct = await Product.find({
      _id: id,
      vendorID: user[0]._id,
    });
    console.log(req.user);
    console.log(verifiedProduct);
    if (req.user.role === "vendor") {
      if (checkProducts(verifiedProduct)) {
        verifiedProduct.map(async (e) => {
          const data = await Product.findByIdAndUpdate(e._id, {
            shippingSchedule1,
            shippingSchedule2,
            shippingSchedule3,
          });
        });
        res.send("DATE UPDATED");
      } else {
        res.status(401).send("DATE ALREADY UPDATED OR THERE ARE NO PRODUCT TO UPDATE");
      }
    } else {
      res.status(401).send("NOT A VERIFIED VENDOR");
    }
  } catch (e) {
    res.status(400).json("ERROR...", e);
  }
};

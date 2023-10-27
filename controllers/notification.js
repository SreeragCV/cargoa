const Notification = require('../models/notification');
const Product = require('../models/product');
const User = require('../models/user');

module.exports.notificationMessage = async (currentUser, product) => { 
    try{
    const notify = new Notification({message: `${currentUser.username}, notified you!`, active});
    notify.userID = currentUser
    notify.purchaseID = product
    notify.save();
    } catch(err) {
        console.log(err);
    }
}

module.exports.responseNotification = async (req, res) => {
    const { id } = req.params; 
    const {shippingSchedule1, shippingSchedule2, shippingSchedule3} = req.body;
    const user = await User.find({email: req.user.email});
    const verifiedProducts = await Product.find({vendorID: id, userID: user[0]._id});
    if(verifiedProducts.length > 0){
        verifiedProducts.map(async (e) => {
            data = await Product.findByIdAndUpdate( e._id, {shippingSchedule1,shippingSchedule2,shippingSchedule3});
        })
    } else {
        res.status(401).json('NOT A VERIFIED VENDOR');
    }
}

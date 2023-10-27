const Notification = require('../models/notification');
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


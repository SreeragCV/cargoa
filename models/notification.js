const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false,
        required: true
    },
    vendorID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    purchaseID: {
        type: Schema.Types.ObjectId,
        ref:'Product',
        required: true
    }
})

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  shippingDate: {
    type: String,
    required: true
  }
  ,
  shippingSchedule1: {
    type: String,
  },

  shippingSchedule2: {
    type: String,
  },

  shippingSchedule3: {
    type: String,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vendorID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
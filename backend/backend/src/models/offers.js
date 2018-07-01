const mongoose = require('mongoose')

const OfferSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  descriptions: {
    type: String,
    required: true,
  },
  // exchange item
  price: String,
  category: String,
  images: [String],
  amount: {
    type: Number,
    required: true
  },
  isInfinite: Boolean,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
})

module.exports = mongoose.model('Offer',OfferSchema)

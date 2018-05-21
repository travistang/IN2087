const mongoose = require('mongoose')

const OfferSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  descriptions: {
    type: String,
    required: true,
  },
  // exchange item
  price: Number,
  wants: [{type: mongoose.Schema.Types.ObjectId,ref: 'Wants'}],
  images: [String],
  amount: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Offer',OfferSchema)

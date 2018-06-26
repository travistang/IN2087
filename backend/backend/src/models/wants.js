const mongoose = require('mongoose')

const WantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  descriptions: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
})

module.exports = mongoose.model('Want',WantSchema)

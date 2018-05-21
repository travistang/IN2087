const mongoose = require('mongoose')

const WantSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  descriptions: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Want',WantSchema)

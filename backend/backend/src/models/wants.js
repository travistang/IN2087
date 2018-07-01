"use strict";
const mongoose = require('mongoose');

//mongoose.connect('localhost:1234/app/name/finda');

const WantSchema = new mongoose.Schema({
  title: {
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
});

module.exports = mongoose.model('Want',WantSchema);

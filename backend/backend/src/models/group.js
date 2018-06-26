"use strict";

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: String,
  time: Date,
  author: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const GroupSchema = new mongoose.Schema({
  groupname: {
    type: String,
    required: true,
    unique: true
  },
  descriptions: {
    type: String,
    required: true,
  },

  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],

  wants: [{type:mongoose.Schema.Types.ObjectId,ref: 'Want'}],
  offers: [{type: mongoose.Schema.Types.ObjectId,ref: 'Offer'}]

  messages: [messageSchema] 
})

module.exports = mongoose.model('Group',GroupSchema)

"use strict";

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
  offers: [{type: mongoose.Schema.Types.ObjectId,ref: 'Offer'}],

  messages: [messageSchema]
})

module.exports = {
  GroupModel: mongoose.model('Group',GroupSchema),
  MessageModel: mongoose.model('Message',messageSchema)
}

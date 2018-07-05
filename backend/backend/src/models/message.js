"use strict";

const mongoose = require('mongoose');
const Group = require('./group')

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


const conversationSchema = new mongoose.Schema({
  messages: [messageSchema],
  initiator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receipant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = {
  MessageModel: mongoose.model('ConversationMessage',messageSchema),
  ConversationModel: mongoose.model('Conversation',conversationSchema)
}

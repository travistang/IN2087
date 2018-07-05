const {ConversationModel,MessageModel} = require('../models/message')

const getAllConversations = async (req,res) => {
  let initiator = req.userId
  try {
    let result = await ConversationModel.find({participants: initiator})
      .populate('participants')
      .exec()
    return res.status(200).json(result)
  } catch(e) {
    return res.status(500).json(e.message)
  }
}
const getMessageWithUser = async (req,res) => {
  let receipant = req.params.userId
  let initiator = req.userId
  try {
    let result = await ConversationModel.findOne({participants: {
      $all: [initiator,receipant]

    }})
      .populate('participants messages')
      .exec()
    return res.status(200).json(result)
  } catch(e) {
    return res.status(500).json(e.message)
  }
}
// expect message = {message: <string>}
const postMessageWithUser = async (req,res) => {
  let receipant = req.params.userId
  let initiator = req.userId
  let message = {message: req.body.message}

  message.time = new Date()
  message.author = initiator

  // let messageObj = MessageModel.create(message)
  try {
    let result = await ConversationModel.findOne({participants: {
      $all: [initiator,receipant]
    }}).exec()
    if(!result) {
      // create one...
            let convo = await ConversationModel.create({
        participants: [initiator,receipant],
        messages: [message]
      })
      return res.status(200).json(convo)
    } else {
      let result = await ConversationModel.findOneAndUpdate({participants: {
        $all: [initiator,receipant]
      }},{
        $push: {
          messages: {
            $each: [message]
          }
        }
      }).exec()
      return res.status(200).json(result)
    }

  } catch(e) {
    return res.status(500).json(e.message)
  }
}
module.exports = {
  getAllConversations,
  getMessageWithUser,
  postMessageWithUser,
}

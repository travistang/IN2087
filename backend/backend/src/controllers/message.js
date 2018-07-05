const {ConversationModel,MessageModel} = require('../models/message')

const getMessageWithUser = async (req,res) => {
  let receipant = req.params.userId
  let initiator = req.userId
  try {
    let result = ConversationModel.findOne({initiator,receipant})
      .populate('receipant')
      .populate('initiator')
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
  let message = req.body.message

  message.time = new Date()
  message.author = initiator

  try {
    let result = ConversationModel.findOne({initiator,receipant})
    if(result.length == 0) {
      // create one...
      let messageObj = MessageModel.create(message)
      let convo = ConversationModel.create({
        initiator,
        receipant,
        messages: [messageObj]
      })
      return res.status(200).json(convo)
    } else {
      let result = ConversationModel.findOneAndUpdate({initiator,receipant},{
        $push: {
          messages: {
            $each: [messageObj]
          }
        }
      })
      return res.status(200).json(result)
    }

  } catch(e) {
    return res.status(500).json(e.message)
  }
}
module.exports = {
  getMessageWithUser,
  postMessageWithUser,
}

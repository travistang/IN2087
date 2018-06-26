const __group = require('../../models/group')
const GroupModel = __group.GroupModel
const MessageModel = __group.MessageModel

const UserModel = require('../../models/user')
const WantsModel = require('../../models/wants')
const OffersModel = require('../../models/offers')
const config = require('../../config')


// TODO: test
const createGroup = async (groupname,descriptions,creator,res) => {
  try{
    let group = await GroupModel.create({
      groupname,
      descriptions,
      members: [creator]
    })
    res.status(200).json(group)
  }catch(e){
    res.status(500).json(e)
  }
}

const info = async (groupname,res) => {
  try {
    let group = await GroupModel
      .findOne({groupname},{messages: 0})
      .populate({
        path: 'members',
        select: ['username','wants','offers']
      })
      .populate('wants')
      .populate('offers')
      .exec()
    res.status(200).json(group)
  } catch(e) {
    res.status(500).json(e)
  }
}

const getWants = async (groupname,res) => {
  try {
    let wants = await GroupModel
      .findOne({groupname})
      .populate('wants')
      .select('wants')
      .exec()
    res.status(200).json(
      Object.assign({},{wants:wants.wants},{groupname})
    )
  }catch(e) {
    res.status(500).json(e)
  }
}

const addWants = async (groupname,wants,creator,res) => {
  try {
    let wantResult = await WantsModel.create(Object.assign({},wants,{creator}))
    if(!wantResult._id) return res.status(500).json({
      error: "Failed to add wants"
    })

    let result = await GroupModel
      .findOneAndUpdate({groupname}, {
        $push: {
          'wants': {
            '$each': [wantResult._id]
          }
        }
      }).exec()
    return res.status(200).json(wantResult) // yeah, why should the group info be returned...
  } catch(e) {
    res.status(500).json({
      error: e.message
    })
  }
}
const getOffers = async (groupname,res) => {
  try {
    let offers = await GroupModel
      .findOne({groupname})
      .populate('offers')
      .select('offers')
      .exec()
    res.status(200).json(
      Object.assign({},{offers:offers.offers},{groupname})
    )
  }catch(e) {
    res.status(500).json(e)
  }
}

const addOffers = async (groupname,offers,creator,res) => {
  try {
    let offerResult = await OffersModel.create(Object.assign({},offers,{creator}))
    if(!offerResult._id) return res.status(500).json({
      error: "Failed to add offer"
    })

    let result = await GroupModel
      .findOneAndUpdate({groupname}, {
        $push: {
          'offers': {
            '$each': [offerResult._id]
          }
        }
      }).exec()
    return res.status(200).json(offerResult) // yeah, why should the group info be returned...
  } catch(e) {
    res.status(500).json({
      error: e.message
    })
  }
}

const getChats = async (groupname,res) => {
  try {
    let chats = await GroupModel
      .findOne({groupname})
      .select('messages')
      .exec()
    return res.status(200).json(chats)
  } catch(e) {
    res.status(500).json({
      error: e.message
    })
  }
}

const addChats = async (groupname,message,res) => {
  try {
     let messageObj = new MessageModel(message)
     let updateResults = await GroupModel
      .findOneAndUpdate({groupname},{
        $push: {
          'messages': {
            '$each': [messageObj]
          }
        }
      })
      .exec()
    return res.status(200).json(messageObj)
  } catch(e) {
    res.status(500).json({
      error: e.message
    })
  }
}
module.exports = {
  info,
  createGroup,

  getWants,
  addWants,

  getOffers,
  addOffers,

  getChats,
  addChats,
}

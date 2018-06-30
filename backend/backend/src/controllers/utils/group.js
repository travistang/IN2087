const __group = require('../../models/group')
const GroupModel = __group.GroupModel
const MessageModel = __group.MessageModel

const UserModel = require('../../models/user')
const WantsModel = require('../../models/wants')
const OffersModel = require('../../models/offers')
const config = require('../../config')


// aux functions for controlling memberships
const isUserInGroup = async (groupname,userId,res) => {

  let count = await GroupModel.count({
    groupname,
    members: userId
  }).exec()
  // if there is such a group, then its _id shouldnt be undefined
  return count == 1
}

const getGroupList = async (userId,res) => {
  try {
    console.log('userId')
    console.log(userId)
    let groups = await GroupModel
      .aggregate([
        {
          $match: {
            members: userId,
          }
        },
        {
          $project: {
            "groupname": 1,
            "descriptions": 1,
            "wants": {$size: "$wants"},
            "offers": {$size: "$offers"},
            "members": {$size: "$members"}
          }
        }
      ])
      .exec()
    return res.status(200).json(groups)
  } catch(e) {
    return res.status(500).json(e.message)
  }
}
const addUserToGroup = async (groupname,userId) => {
  try {
    let groupId = await GroupModel.findOne({groupname}).select("_id")
    groupId = groupId._id
    let result = await UserModel.findOneAndUpdate({_id: userId},
    {
      $addToSet: {
        "groups": groupId
      }
    })
    let groupResult = await GroupModel.findOneAndUpdate({groupname},{
      $addToSet: {
        "members": userId
      }
    })

    return result
  }catch(e){
    return e
  }
}

const removeUserFromGroup = async (groupname,userId) => {
  try {
    let groupId = await GroupModel.findOne({groupname}).select("_id")
    groupId = groupId._id
    let result = await UserModel.findOneAndUpdate({_id: userId},
    {
      $pull: {
        "groups": groupId
      }
    })
    let groupResult = await GroupModel.findOneAndUpdate({groupname},{
      $pull: {
        "members": userId
      }
    })
    return result
  }catch(e){
    return e
  }
}
const joinGroup = async (groupname,userId,res) => {
  let result = await addUserToGroup(groupname,userId)
  if(!result._id) return res.status(500).json(result)
  else return res.status(200).json(result)
}
const quitGroup = async (groupname,userId,res) => {
  let result = await removeUserFromGroup(groupname,userId)
  if(!result._id) return res.status(500).json(result)
  else return res.status(200).json(result)
}


// TODO: test
const createGroup = async (groupname,descriptions,creator,res) => {
  try{
    let group = await GroupModel.create({
      groupname,
      descriptions,
      members: [creator]
    })
    let result = await addUserToGroup(groupname,creator)
    if(!result._id) return res.status(500).json(
      {
        "error": "Unable to add user to group"
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

const editInfo = async (groupname,info,res) => {
  try {
    let result = await GroupModel
      .findOneAndUpdate({groupname},
      {
        descriptions: info.descriptions
      })
      .exec()
    res.status(200).json(result)
  }catch(e) {
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

const deleteWants = async (groupname,wants,res) => {
  try {
    let wantResult = await WantsModel.deleteOne({_id: wants}).exec()

    let groupResult = await GroupModel.findOneAndUpdate({groupname}, {
      $pull: {
        wants: wants
      }
    }).exec()
    return res.status(200).json(groupResult)

  }catch(e) {
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

const deleteOffers = async (groupname,offers,res) => {
  try {
    let offerResult = await OffersModel.deleteOne({_id: offers}).exec()
    let groupResult = await GroupModel.findOneAndUpdate({groupname}, {
      $pull: {
        offers: offers
      }
    }).exec()
    return res.status(200).json(groupResult)

  }catch(e) {
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
  getGroupList,

  info,
  editInfo,

  createGroup,

  getWants,
  addWants,
  deleteWants,

  getOffers,
  addOffers,
  deleteOffers,

  getChats,
  addChats,

  joinGroup,
  quitGroup,

  isUserInGroup,
}

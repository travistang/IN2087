const GroupModel = require('../models/group')
const GroupUtils = require('./utils/group')

const info = (req,res) => {
  let groupname = req.params.groupname
  return GroupUtils.info(groupname,res)
}

const createGroup = (req,res) => {

  let title = req.body.groupname
  let descriptions = req.body.descriptions
  let creator = req.userId
  if(!title || !descriptions) return res.status(400).json({
    "error": "Missing title, descriptions or both"
  })
  return GroupUtils.createGroup(title,descriptions,creator,res)
}

const getWants = (req,res) => {
  let groupname = req.params.groupname
  if(!groupname) return res.status(400).json({
    "error": "Name of the group must be provided"
  })
  return GroupUtils.getWants(groupname,res)
}

const addWants = (req,res) => {
  let creator = req.userId
  let groupname = req.params.groupname
  let wants = req.body.wants
  if(!wants || !groupname) return res.status(400).json({
    "error": "Group name and wants object are required to add a want"
  })
  return GroupUtils.addWants(groupname,wants,creator,res)
}

const deleteWants = async (req,res) => {
  let user = req.userId
  let groupname = req.params.groupname
  let wants = req.body.wants

  try {
    let isUserInGroup = await GroupUtils.isUserInGroup(groupname,user,res)
    if(!isUserInGroup) return res.status(403).json({
      "error": "You are not a memeber of this group"
    })
  } catch(e) {
    return res.status(500).json(e.message)
  }

  return GroupUtils.deleteWants(groupname,wants,res)
}

const getOffers = (req,res) => {
  let groupname = req.params.groupname
  if(!groupname) return res.status(400).json({
    "error": "Name of the group must be provided"
  })
  return GroupUtils.getOffers(groupname,res)
}

const addOffers = (req,res) => {
  let creator = req.userId
  let groupname = req.params.groupname
  let offers = req.body.offers
  if(!offers || !groupname) return res.status(400).json({
    "error": "Group name and offers object are required to add a offer"
  })
  return GroupUtils.addOffers(groupname,offers,creator,res)
}

const deleteOffers = async (req,res) => {
  let user = req.userId
  let groupname = req.params.groupname
  let offers = req.body.offers

  try {
    let isUserInGroup = await GroupUtils.isUserInGroup(groupname,user,res)
    if(!isUserInGroup) return res.status(403).json({
      "error": "You are not a memeber of this group"
    })
  } catch(e) {
    return res.status(500).json(e.message)
  }

  return GroupUtils.deleteOffers(groupname,offers,res)
}

const getChats = (req,res) => {
  let groupname = req.params.groupname
  return GroupUtils.getChats(groupname,res)
}

const addChats = (req,res) => {
  let groupname = req.params.groupname
  let message = req.body.message
  let creator = req.userId
  if(!message) return res.status(400).json({
    "error":"Message object must be provided"
  })
  let resultMessage = {
    time: new Date(),
    message,
    author: creator
  }

  // return res.status(200).json(resultMessage)
  return GroupUtils.addChats(groupname,resultMessage,res)
}

const joinGroup = (req,res) => {
  let userId = req.userId
  let groupname = req.params.groupname
  return GroupUtils.joinGroup(groupname,userId,res)
}

const quitGroup = (req,res) => {
  let userId = req.userId
  let groupname = req.params.groupname
  return GroupUtils.quitGroup(groupname,userId,res)
}

module.exports = {
  info,
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
  quitGroup
}

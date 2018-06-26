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
  let groupname = req.params.groupname
  let wants = req.body.wants
  if(!wants || !groupname) return res.status(400).json({
    "error": "Group name and wants object are required to add a want"
  })
  return GroupUtils.addWants(groupname,wants,res)
}
module.exports = {
  info,
  createGroup,
  getWants,
  addWants
}

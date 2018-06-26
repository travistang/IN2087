const GroupModel = require('../models/group')
const GroupUtils = require('./utils/group')

const info = (req,res) => {
  let groupname = req.params.groupname
  return GroupUtils.info(groupname,res)
}

const createGroup = (req,res) => {
  let title = req.params.title
  let descriptions = req.params.descriptions
  let creator = req.params.creator
  return GroupUtils.createGroup(title,descriptions,creator,res)
}

module.exports = {
  info,
  createGroup
}

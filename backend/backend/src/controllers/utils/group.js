const GroupModel = require('../../models/group')
const UserModel = require('../../models/user')
const WantsModel = require('../../models/wants')
const OffersModel = require('../../models/offers')
const config = require('../../config')


// TODO: test
const createGroup = async (title,descriptions,creator,res) => {
  try{
    let group = await GroupModel.create({
      title,
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
    let group = await GroupModel.findOne({groupname}).populate().exec()
    res.status(200).json(group)
  } catch(e) {
    res.status(500).json(e)
  }

module.exports = {
  info,
  createGroup
}

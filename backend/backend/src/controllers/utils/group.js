const GroupModel = require('../../models/group')
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
      .findOne({groupname})
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
      Object.assign({},{wants},{groupname})
    )
  }catch(e) {
    res.status(500).json(e)
  }
}
module.exports = {
  info,
  createGroup,

  getWants,
}

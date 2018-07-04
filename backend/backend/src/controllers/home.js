const Group = require('../models/group')
const OfferModel = require('../models/offers')
const WantModel = require('../models/wants')
const UserModel = require('../models/user')
const SearchUtils = require('./utils/search')
const getHomeContent = async (req,res) => {
  // get 5 wants and 5 offers, and 5 group
  try{

    let offers = await OfferModel.find().limit(5).exec()
    let wants = await WantModel.find().limit(5).exec()
    let groups = await Group.GroupModel.find().limit(5).exec()

    return res.status(200).json({
      wants,
      offers,
      groups
    })
  }catch(e) {
    return res.status(500).json(e.message)
  }
}

module.exports = {
  getHomeContent
}

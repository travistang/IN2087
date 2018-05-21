// controller for giving / editing info about this user
const config    = require('../config')
const UserModel = require('../models/user')
const userUtils = require('./utils/user')
const info = (req,res) => {
  let userId = req.userId
  userUtils.getUserInfo({_id: userId},res)
}

const wants = (req,res) => {
  let userId = req.userId
  userUtils.getUserWants({_id: userId},res)
}

const offers = (req,res) => {
  let userId = req.userId
  userUtils.getUserOffers({_id: userId},res)
}

const addWants = (req,res) => {
  let userId = req.userId
  let wants = req.body.wants
  userUtils.addWants(userId,wants,res)
}
module.exports = {
  info,
  wants,
  offers,

  addWants
}

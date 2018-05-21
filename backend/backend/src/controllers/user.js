const config = require('../config')
const UserModel = require('../models/user')
const userUtils = require('./utils/user')
const info = (req,res) => {
  let username = req.params.username
  userUtils.getUserInfo({username},res)
}
const wants = (req,res) => {
  let username = req.params.username
  userUtils.getUserWants({username},res)
}
const offers = (req,res) => {
  let username = req.params.username
  userUtils.getUserOffers({username},res)
}
module.exports = {
  info,
  wants,
  offers,
}

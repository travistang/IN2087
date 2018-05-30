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
  let title = req.body.title
  if(!title) return res.status(400).json({
    error: "Missing want title"
  })
  let descriptions = req.body.descriptions
  if(!descriptions) return res.status(400).json({
    err: "Missing want descriptions"
  })
  let wants = {title,descriptions}
  userUtils.addWants(userId,[wants],res)
}

const addOffers = (req,res) => {
  let userId = req.userId
  //retrieve all infos
  let offers = {}
  let mandatoryField = "title descriptions amount".split(' ')
  let optionalField = "price wants images amount".split(' ')
  for(let i in mandatoryField) {
    let attr = mandatoryField[i]
    if(!req.body[attr]) return res.status(400).json({
      error:`missing required field ${attr}`
    })
    // assign it to the offer obj.
    offers[attr] = req.body[attr]
  }
  // TODO: add type check here
  for(let i in optionalField) {
    let attr = optionalField[i]
    if(req.body[attr]) {
      offers[attr] = req.body[attr]
    }
  }
  offers["isInfinite"] = false
  userUtils.addOffers(userId,[offers],res)
}
module.exports = {
  info,
  wants,
  offers,

  addWants,
  addOffers,
}

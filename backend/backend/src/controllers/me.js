// controller for giving / editing info about this user
const config    = require('../config')
const UserModel = require('../models/user')
const userUtils = require('./utils/user')
const OfferModel = require('../models/offers')
const WantModel = require('../models/wants')

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
  let parseWant = (want) => {
    let fields = "name descriptions".split(' ')
    if(fields.some(field => Object.keys(want).indexOf(field) == -1)) {
      return res.status(400).json({
        error: `missing either name or descriptions`
      })
    }
    return {name:want.name,descriptions:want.descriptions}
  }
  if (Array.isArray(req.body)) {
    let wants = req.body.map(parseWant)
    userUtils.addWants(userId,wants,res)
  } else {
    let wants = parseWant(req.body)
    userUtils.addWants(userId,[wants],res)
  }
}

const addOffers = (req,res) => {
  let userId = req.userId
  //retrieve all infos
  let parseOffer = (offer) => {
    let offers = {}
    let mandatoryField = "name descriptions amount".split(' ')
    let optionalField = "price wants images amount".split(' ')
    for(let i in mandatoryField) {
      let attr = mandatoryField[i]
      if(!offer[attr]) return res.status(400).json({
        error:`missing required field ${attr}`
      })
      // assign it to the offer obj.
      offers[attr] = offer[attr]
    }
    // TODO: add type check here
    for(let i in optionalField) {
      let attr = optionalField[i]
      if(offer[attr]) {
        offers[attr] = offer[attr]
      }
    }
    offers["isInfinite"] = false
    return offers
  }

  if(Array.isArray(req.body)) {
    let offers = req.body.map(parseOffer)
    userUtils.addOffers(userId,offers,res)
  } else {
    userUtils.addOffers(userId,[req.body],res)
  }

}
const toPremium = (req,res) => {
  let userId = req.userId
  userUtils.toPremium(userId,res)
}

const deleteWants = async (req,res) => {
  let userId = req.userId

  let wants = req.body.wants
  try {
    let result = await WantModel.findByIdAndRemove(wants).exec()
    let userResult = await WantModel.findOneAndUpdate({_id: userId},{
      $pullAll: {
        wants: [wants]
      }
    }).exec()

    return res.status(200).json(result)
  } catch(e) {
    return res.status(500).json(e.message)
  }
}
const deleteOffers = async (req,res) => {
  let userId = req.userId

  let wants = req.body.offers
  try {
    let result = await OfferModel.findByIdAndRemove(wants).exec()
    let userResult = await OfferModel.findOneAndUpdate({_id: userId},{
      $pullAll: {
        wants: [wants]
      }
    }).exec()

    return res.status(200).json(result)
  } catch(e) {
    return res.status(500).json(e.message)
  }
}
module.exports = {
  info,
  wants,
  offers,

  addWants,
  addOffers,

  toPremium,

  deleteWants,
  deleteOffers
}

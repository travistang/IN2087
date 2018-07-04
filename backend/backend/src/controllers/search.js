const Group = require('../models/group')
const OfferModel = require('../models/offers')
const WantModel = require('../models/wants')
const UserModel = require('../models/user')
const SearchUtils = require('./utils/search')


const searchUser = async (req,res) => {
  // TODO: perhaps query?
  let searchString = req.query.q
  return await SearchUtils.searchUser(searchString,res)

}

const searchOffer = async (req,res) => {
  let searchString = req.query.q
  return await SearchUtils.searchOffer(searchString,res)
}

const searchWant = async (req,res) => {
  let searchString = req.query.q
  return await SearchUtils.searchWant(searchString,res)
}

const searchGroup = async (req,res) => {
  let searchString = req.query.q
  return await SearchUtils.searchGroup(searchString,res)
}

const searchCategories = async (req,res) => {
  let searchString = req.query.q
  return await SearchUtils.searchCategories(searchString,res)
}


module.exports = {
  searchUser,
  searchOffer,
  searchWant,
  searchGroup,
  searchCategories
}

const config = require('../config')
const wantsModel = require('../models/wants')
const wantUtils = require('./utils/want')
const info = (req,res) => {
    let title = req.params.title
    wantUtils.getWantsInfo({username},res)
}
/*const wants = (req,res) => {
    let username = req.params.username
    userUtils.getUserWants({username},res)
}
const offers = (req,res) => {
    let username = req.params.username
    userUtils.getUserOffers({username},res)
}*/
module.exports = {
    info,
   // wants,
   // offers,
}
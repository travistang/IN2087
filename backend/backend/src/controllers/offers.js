const config = require('../config')
const offersModel = require('../models/offers')
const offerUtils = require('./utils/offer')



const test=(req,res)=>{
    res.json({
        name: 'It works!'
    });
}

const info = (req,res) => {
    let title = req.params.title
    offerUtils.getOfferInfo({title},res)
}
const list=(req,res)=>{
    offerUtils.list(req,res)
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
    test,
    info,
    list,

    // offers,
}
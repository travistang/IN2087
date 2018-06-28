const config = require('../config')
const wantsModel = require('../models/wants')
const wantUtils = require('./utils/want')



const test=(req,res)=>{
    res.json({
        name: 'It works!'
    });
}

const info = (req,res) => {
    let title = req.params.title
    wantUtils.getWantsInfo({title},res)
}
const list=(req,res)=>{
    wantUtils.list(req,res)
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
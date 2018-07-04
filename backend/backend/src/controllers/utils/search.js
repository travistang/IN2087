const Group = require('../../models/group')
const OfferModel = require('../../models/offers')
const WantModel = require('../../models/wants')
const UserModel = require('../../models/user')


const searchUser = async (searchString,res) => {
  try {
    let results = await UserModel.aggregate([
      {
        $match: {
          username: {
            $regex: searchString
          }
        }
      },
      {
        $project: {
          username: 1,
          gender: 1,
          wants: {
            $size: "$wants"
          },
          offers: {
            $size: "$offers",
          },
          // groups: {
          //   $size: "$groups"
          // }
        }
      }
    ])
    .exec()
    return res.status(200).json(results)

  }catch(e) {
    return res.status(500).json(e.message)
  }
}

const searchOffer = async (searchString,res) => {
  try {
    let results = await OfferModel.find({
      $or: [
        {
          name: {
            $regex: searchString
          }
        },
        {
          title: {
            $regex: searchString
          }
        }]

    }).exec()
    return res.status(200).json(results)
  }catch(e) {
    return res.status(500).json(e.message)
  }
}
const searchWant = async (searchString,res) => {
  try {
    let results = await WantModel.find({
      $or: [
        {
          name: {
            $regex: searchString
          }
        },
        {
          title: {
            $regex: searchString
          }
        }]

    }).exec()
    return res.status(200).json(results)
  }catch(e) {
    return res.status(500).json(e.message)
  }
}
const searchGroup = async (searchString,res) => {
  try {
    let results = await Group.GroupModel.find({
      groupname: {
        $regex: searchString
      }

    })
    .select('groupname wants offers')
    .exec()
    return res.status(200).json(results)
  }catch(e) {
    return res.status(500).json(e.message)
  }
}
const searchCategories = async (searchString,res) => {
  try {
    let wantCategories = await WantModel.find()
      .select('categories')
      .exec()

    wantCategories = wantCategories.map(c => c.categories).reduce((a,c) => a.concat(c),[])
    let offerCategories = await OfferModel.find()
      .select('categories')
      .exec()

    offerCategories = offerCategories.map(c => c.categories).reduce((a,c) => a.concat(c),[])
    return res.status(200).json(
    [
      ...new Set(
        wantCategories
          .concat(offerCategories)
          .filter(c => c.indexOf(searchString) != -1)
        )
    ])

  }catch(e) {
    return res.status(500).json(e.message)
  }
}
module.exports = {
  searchUser,
  searchOffer,
  searchWant,
  searchGroup,
  searchCategories
}

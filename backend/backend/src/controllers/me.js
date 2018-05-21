// controller for giving / editing info about this user
const config    = require('../config')
const UserModel = require('../models/user')

const info = (req,res) => {
  let userId = req.userId
  UserModel.findOne({_id: userId})
          .exec()
          .populate('wants')
          .populate('offers')
          .then(user => {
            if(!user) {
              res.status(404).json({
                error: "User Not Found",
              })
            } else {
              res.status(200).json(
                Object.assign(user,{password: '',wants: []})
              )
            }
          })
          .catch(e => res.status(404).json({
            error: 'Unknown error',
            message: e.message
          }))
}

module.exports = {
  info,
}

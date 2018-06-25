
const WantsModel = require('../../models/wants')
const config = require('../../config')



const getWantsInfo = (query,res) => {
    WantsModel.findOne(query)
        .populate('wants')
        .select('wants')
        .exec()
        .then(wants => {
            if(!wants) {
                res.status(404).json({
                    error: "Wants Not Found",res,
                })
            } else {
                res.status(200).json(wants)
            }
        })
        .catch(e => res.status(404).json({
            error: 'Unknown error',
            message: e.message
        }))
}

const list  = (req, res) => {
    WantsModel.find({}).exec()
        .then(wants => res.status(200).json(wants))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

module.exports = {
    getWantsInfo,
    list,
}
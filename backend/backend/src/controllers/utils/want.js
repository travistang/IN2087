
const WantsModel = require('../../models/wants');
const config = require('../../config');



const getWantsInfo =   (query,res) => {
    WantsModel.find({}).exec()
        .then(wants => res.status(200).json(wants))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));


};

const list  =   (req, res) => {
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
};
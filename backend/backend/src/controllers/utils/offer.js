const OffersModel = require('../../models/offers');
const config = require('../../config');



const getOfferInfo =   (query,res) => {
    OffersModel.find({}).exec()
        .then(offers => res.status(200).json(offers))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));


};



const list  =   (req, res) => {
    //search offer titles
    if(req.query.search){
        const regex=new RegExp(req.query.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),'gi');
        OffersModel.find({"name":regex}).exec()
            .then(offers => res.status(200).json(offers))
            .catch(error => res.status(500).json({
                error: 'Internal server error',
                message: error.message
            }));
    }
    //list all offers
    else {
        OffersModel.find({}).exec()
            .then(offers => res.status(200).json(offers))
            .catch(error => res.status(500).json({
                error: 'Internal server error',
                message: error.message
            }));
    }


};




module.exports = {
    getOfferInfo,
    list,
};
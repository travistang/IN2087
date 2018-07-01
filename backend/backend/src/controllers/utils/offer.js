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
    //search offer titles & categories
    if(req.query.search){
        if(req.query.category){
            const regex=new RegExp(req.query.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),'gi');
            const regexCategory=new RegExp(req.query.category.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),'gi');
            OffersModel.find({$and: [{"name":regex},{"category":regexCategory}]}).exec()
                .then(offers => res.status(200).json(offers))
                .catch(error => res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                }));
        }
        else{
            const regex=new RegExp(req.query.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),'gi');
            OffersModel.find({"name":regex}).exec()
                .then(offers => res.status(200).json(offers))
                .catch(error => res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                }));

        }

    }
    else {
        if (req.query.category) {
            const regexCategory = new RegExp(req.query.category.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'gi');
            OffersModel.find({"category": regexCategory}).exec()
                .then(offers => res.status(200).json(offers))
                .catch(error => res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                }));
        }
        else{
            OffersModel.find({}).exec()
                .then(offers => res.status(200).json(offers))
                .catch(error => res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                }));

        }
    }



};




module.exports = {
    getOfferInfo,
    list,
};
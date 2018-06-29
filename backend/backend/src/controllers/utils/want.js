
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
    //search wants titles
    if(req.query.search){
        const regex=new RegExp(req.query.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),'gi');
        WantsModel.find({"title":regex}).exec()
            .then(wants => res.status(200).json(wants))
            .catch(error => res.status(500).json({
                error: 'Internal server error',
                message: error.message
            }));
    }
    //list all wants
    else {
        WantsModel.find({}).exec()
            .then(wants => res.status(200).json(wants))
            .catch(error => res.status(500).json({
                error: 'Internal server error',
                message: error.message
            }));
    }


};




module.exports = {
    getWantsInfo,
    list,
};
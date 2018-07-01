
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
    //list by categories &search item
    if(req.query.search){
        if(req.query.category){
            const regex=new RegExp(req.query.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),'gi');
            const regexCategory=new RegExp(req.query.category.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),'gi');
            WantsModel.find({$and: [{"name":regex},{"category":regexCategory}]}).exec()
                .then(wants => res.status(200).json(wants))
                .catch(error => res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                }));
        }
        else{
            const regex=new RegExp(req.query.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),'gi');
            WantsModel.find({"name":regex}).exec()
                .then(wants => res.status(200).json(wants))
                .catch(error => res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                }));

        }

    }
    else {
        if (req.query.category) {
            const regexCategory = new RegExp(req.query.category.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'gi');
            WantsModel.find({"category": regexCategory}).exec()
                .then(wants => res.status(200).json(wants))
                .catch(error => res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                }));
        }
        else{
            WantsModel.find({}).exec()
                .then(wants => res.status(200).json(wants))
                .catch(error => res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                }));

        }
    }


};




module.exports = {
    getWantsInfo,
    list,
};
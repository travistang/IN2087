
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

const list  =  async (req, res) => {
    try {

    let wants = await WantsModel.find({})
        //.populate('wants')
        .select('wants')
        .exec()
        return res.status(200).json(wants)
       /* res.status(200).json(
            Object.assign({},{offers:offers.offers},{groupname})
        )*/
}
catch(e){ res.status(500).json({
         error:e.message
        })
    }


/*
  WantsModel.find({}).toArray(function(error,wants){
      if(err)throw error;
    res.send(wants);
  });*/
/*WantsModel.find({}).populate('wants')
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
        }))*/
};

module.exports = {
    getWantsInfo,
    list,
}
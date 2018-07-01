"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');
const OffersController = require('../controllers/offers');

router.get('/:id',OffersController.info);//show want by title
router.get('/',OffersController.list);//list all wants
router.get('/test',OffersController.test);//test
//router.get('/:title/info',WantsController.info)
module.exports = router;
"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');
const WantsController = require('../controllers/wants');

router.get('/:title',WantsController.info);//show want by title
router.get('/',WantsController.list);//list all wants
router.get('/test',WantsController.test);//test
//router.get('/:title/info',WantsController.info)
module.exports = router;
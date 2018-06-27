"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');
const WantsController = require('../controllers/want');

router.get('all/wants/:title',WantsController.info);//show want by title
router.get('/all/wants',WantsController.list);//list all wants
//router.get('/:title/info',WantsController.info)
module.exports = router;
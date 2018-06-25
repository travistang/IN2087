"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');
const WantsController = require('../controllers/want');

router.get('/:title',WantsController.info);
router.get('/',WantsController.list);
//router.get('/:title/info',WantsController.info)
module.exports = router;
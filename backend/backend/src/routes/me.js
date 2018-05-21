"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');
const MeController = require('../controllers/me');

// get info of (this) user
router.get('/info',middlewares.checkAuthentication,MeController.info)

module.exports = router

"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');
const UserController = require('../controllers/user');

router.get('/:username',middlewares.checkAuthentication,UserController.info)
router.get('/:username/info',middlewares.checkAuthentication,UserController.info)
router.get('/:username/wants',middlewares.checkAuthentication,UserController.wants)
router.get('/:username/offers',middlewares.checkAuthentication,UserController.offers)
module.exports = router

"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');
const GroupController = require('../controllers/group');

router.get('/:groupname/info', GroupController.info)

router.post('/create_group',middlewares.checkAuthentication, GroupController.createGroup)

router.get('/:groupname/wants',GroupController.getWants)
module.exports = router

"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');
const GroupController = require('../controllers/group');

router.get('/:groupname/info', GroupController.info)

router.post('/create_group',middlewares.checkAuthentication, GroupController.createGroup)

router.get('/:groupname/wants',GroupController.getWants)
router.post('/:groupname/wants',middlewares.checkAuthentication,GroupController.addWants)
module.exports = router

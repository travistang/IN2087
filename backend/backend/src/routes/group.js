"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');
const GroupController = require('../controllers/group');

router.get('/:groupname/info', GroupController.info)

router.post('/create_group',middlewares.checkAuthentication, GroupController.createGroup)

router.get('/:groupname/wants',GroupController.getWants)
router.post('/:groupname/wants',middlewares.checkAuthentication,GroupController.addWants)

router.get('/:groupname/offers',GroupController.getOffers)
router.post('/:groupname/offers',middlewares.checkAuthentication,GroupController.addOffers)

router.get('/:groupname/messages',GroupController.getChats)
router.post('/:groupname/messages',middlewares.checkAuthentication,GroupController.addChats)
module.exports = router

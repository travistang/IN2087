"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');
const GroupController = require('../controllers/group');

router.get('/:groupname/info', GroupController.info)

router.post('/',middlewares.checkAuthentication, GroupController.createGroup)

router.get('/:groupname/wants',GroupController.getWants)
router.post('/:groupname/wants',middlewares.checkAuthentication,GroupController.addWants)
router.delete('/:groupname/wants',middlewares.checkAuthentication,GroupController.deleteWants)

router.get('/:groupname/offers',GroupController.getOffers)
router.post('/:groupname/offers',middlewares.checkAuthentication,GroupController.addOffers)
router.delete('/:groupname/offers',middlewares.checkAuthentication,GroupController.deleteOffers)

router.get('/:groupname/messages',GroupController.getChats)
router.post('/:groupname/messages',middlewares.checkAuthentication,GroupController.addChats)

router.post('/:groupname/join',middlewares.checkAuthentication,GroupController.joinGroup)
router.post('/:groupname/quit',middlewares.checkAuthentication,GroupController.quitGroup)


module.exports = router

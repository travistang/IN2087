"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');
const MeController = require('../controllers/me');

// get info of (this) user
router.get('/info',middlewares.checkAuthentication,MeController.info)

router.get('/wants',middlewares.checkAuthentication,MeController.wants)
router.post('/wants',middlewares.checkAuthentication,MeController.addWants)
router.delete('/wants', middlewares.checkAuthentication,MeController.deleteWants)

router.get('/offers',middlewares.checkAuthentication,MeController.offers)
router.post('/offers',middlewares.checkAuthentication,MeController.addOffers)
router.delete('/offers',middlewares.checkAuthentication,MeController.deleteOffers)

router.post('/toPremium',middlewares.checkAuthentication,MeController.toPremium)

module.exports = router

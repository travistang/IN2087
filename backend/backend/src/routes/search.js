"use strict";

const express        = require('express');
const router         = express.Router();

const SearchController = require('../controllers/search')
const middlewares    = require('../middlewares');

router.get('/user',SearchController.searchUser)
router.get('/offer',SearchController.searchOffer)
router.get('/want',SearchController.searchWant)
router.get('/group',SearchController.searchGroup)
router.get('/categories',SearchController.searchCategories)
module.exports = router

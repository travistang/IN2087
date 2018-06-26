"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');
const GroupController = require('../controllers/group');

router.get('/:group/info',null, GroupController.info)
router.post('/create_group',null, GroupController.createGroup)

module.exports = router

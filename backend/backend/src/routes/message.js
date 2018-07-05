"use strict";

const express        = require('express');
const router         = express.Router();

const MessageController = require('../controllers/message')
const middlewares    = require('../middlewares');

router.get('/:userId',middlewares.checkAuthentication,MessageController.getMessageWithUser)
router.post('/:userId',middlewares.checkAuthentication,MessageController.postMessageWithUser)

module.exports = router

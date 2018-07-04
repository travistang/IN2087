"use strict";

const express        = require('express');
const router         = express.Router();

// module.exports = router
const HomeController = require('../controllers/home')
const middlewares = require('../middlewares')

router.get('/',HomeController.getHomeContent)
module.exports = router

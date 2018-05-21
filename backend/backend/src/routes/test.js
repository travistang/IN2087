// routes for testing out some functions, remove this at the end of the project!
"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');
const TestController = require('../controllers/test');

router.get('/register',TestController.testRegister)
router.get('/populate',TestController.testPopulate)
module.exports = router

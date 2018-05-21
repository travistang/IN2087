"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const middlewares = require('./middlewares');

const auth  = require('./routes/auth');
const me    = require('./routes/me')
const user  = require('./routes/user')
const testRoute = require('./routes/test')
const api = express();

// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'It works!'
    });
});

// API routes
api.use('/auth'  , auth)
api.use('/me'    , me)
api.use('/user' , user)

api.use('/test', testRoute)

module.exports = api;

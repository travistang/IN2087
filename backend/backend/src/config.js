"use strict";

//Configuration variables
const port      = process.env.PORT        || '3000';
const mongoURI  = process.env.MONGODB_URI || 'mongodb://mongo:27017/finda';
const JwtSecret = process.env.JWT_SECRET  ||'very secret secret';

// app sepcific settings
const nonPremiumWantsLimit = 5
const nonPremiumOffersLimit = 5
module.exports = {
    port,
    mongoURI,
    JwtSecret,
    
    nonPremiumWantsLimit,
    nonPremiumOffersLimit,
};

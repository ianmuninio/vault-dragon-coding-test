/**
 * Module Dependencies
 */
const express = require('express');
const router = express.Router();

const objectRouter = require('./object');

router.use('/object', objectRouter);

module.exports = router;

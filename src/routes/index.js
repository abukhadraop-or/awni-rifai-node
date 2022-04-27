const express = require('express');

const userRouter = require('./user');
const movieRouter = require('./movie');
const docsRouter = require('./api-docs');

const router = express.Router();

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/api-docs', docsRouter);

module.exports = router;

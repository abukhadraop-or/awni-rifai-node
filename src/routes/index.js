const express = require('express');

const userRouter = require('./user');
const authorRouter = require('./author');
const bookRouter = require('./book');
const docsRouter = require('./api-docs');

const router = express.Router();

router.use('/users', userRouter);
router.use('/authors', authorRouter);
router.use('/books', bookRouter);
router.use('/api-docs', docsRouter);

module.exports = router;

const express = require('express');

const userRouter = require('./user');
const authorRouter = require('./author');
const bookRouter = require('./book');
const docsRouter = require('./api-docs');
const adminLoginRouter = require('./admin-login');

const router = express.Router();

router.use('/users', userRouter);
router.use('/authors', authorRouter);
router.use('/books', bookRouter);
router.use('/api-docs', docsRouter);
router.use('/login', adminLoginRouter);

module.exports = router;

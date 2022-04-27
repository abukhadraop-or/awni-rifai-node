const { check, validationResult } = require('express-validator');

exports.validateUser = [
  check('username')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Username cannot be empty')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum length must be 3')
    .bail(),
  check('email')
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage('Invalid email address!')
    .bail(),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).send({ errors: errors.array() });
    return next();
  },
];

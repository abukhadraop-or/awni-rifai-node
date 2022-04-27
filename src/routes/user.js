const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user');
const { validateUser } = require('../middlewares/validators/userValidator');

const router = express.Router();

/**
 * Handle get to /users route.
 */
router.get('', getUsers);
/**
 * Handle get to /users route.
 */
router.get('/:id', getUserById);
/**
 * Handle post to /users route.
 */
router.route('').post(validateUser, createUser);
/**
 * Handle put to /users route.
 */
router.route('/:id').put(validateUser, updateUser);
/**
 * Handle delete to /users route.
 */
router.delete('/:id', deleteUser);

module.exports = router;

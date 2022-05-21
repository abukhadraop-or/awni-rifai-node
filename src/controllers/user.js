const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { paginate } = require('../utils/paginate');

/**
 * Get all users.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getUsers = async (req, res) => {
  try {
    const page = req.query.page || 1;

    const limit = req.query.limit || 10;
    const offset = paginate(page, limit);
    const users = await User.findAll({
      limit,
      offset,
      order: [['id', 'DESC']],
    });

    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error });
  }
};
/**
 * Get a user by id.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {});

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
/**
 * Create new user.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const createUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const { password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);

    const USER_MODEL = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };

    const userCreated = await User.create(USER_MODEL);

    return res
      .status(200)
      .send({ ...userCreated.dataValues, password: undefined });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
/**
 * Update user info.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const updateUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const { password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);

    const { id } = req.params;
    const data = req.body;

    const USER_MODEL = {
      username: data.username,
      email: data.email,
      password: hashedPassword,
    };

    const [status, userUpdated] = await User.update(USER_MODEL, {
      returning: true,
      where: { id },
    });

    if (status === 0)
      return res
        .status(404)
        .send({ error: 'The user you are trying to update was not found' });

    return res.status(200).send({ ...userUpdated, password: undefined });
  } catch (error) {
    return res.status(500).send(error);
  }
};
/**
 * Delete a user record.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.destroy({ where: { id } });

    if (user === 0)
      return res
        .status(404)
        .send({ error: 'The user you are trying to delete was not found' });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const countUser = async (req, res) => {
  try {
    const userCount = await User.count();

    return res.status(200).send({ userCount });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  countUser,
};

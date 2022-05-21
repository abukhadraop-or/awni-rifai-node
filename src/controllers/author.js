const bcrypt = require('bcryptjs');
const { Author } = require('../models');
const { paginate } = require('../utils/paginate');

/**
 * Get all Authors.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getAuthors = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    // fetch all authors
    if (limit === 10 && page === 1) {
      const authors = await Author.findAll({
        order: [['id', 'DESC']],
      });
      return res.status(200).send(authors);
    }

    // fetch paginated authors
    const offset = paginate(page, limit);
    const authors = await Author.findAll({
      limit,
      offset,
      order: [['id', 'DESC']],
    });

    return res.status(200).send(authors);
  } catch (error) {
    return res.status(500).send({ error });
  }
};
/**
 * Get a Author by id.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await Author.findByPk(id, {});

    if (!author) {
      return res.status(404).send({ error: 'Author not found' });
    }

    return res.status(200).send(Author);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
/**
 * Create new Author.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const createAuthor = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const { password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);

    const AuthorMODEL = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };

    const AuthorCreated = await Author.create(AuthorMODEL);

    return res
      .status(200)
      .send({ ...AuthorCreated.dataValues, password: undefined });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
/**
 * Update Author info.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const updateAuthor = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const { password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);

    const { id } = req.params;
    const data = req.body;

    const AuthorMODEL = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    };

    const [status, AuthorUpdated] = await Author.update(AuthorMODEL, {
      returning: true,
      where: { id },
    });

    if (status === 0)
      return res
        .status(404)
        .send({ error: 'The Author you are trying to update was not found' });

    return res.status(200).send({ ...AuthorUpdated, password: undefined });
  } catch (error) {
    return res.status(500).send(error);
  }
};
/**
 * Delete a Author record.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await Author.destroy({ where: { id } });

    if (author === 0)
      return res
        .status(404)
        .send({ error: 'The Author you are trying to delete was not found' });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const countAuthor = async (req, res) => {
  try {
    const authorCount = await Author.count();

    return res.status(200).send({ authorCount });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  countAuthor,
};

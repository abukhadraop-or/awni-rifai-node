// var static = require('node-static');

const path = require('path');
const fs = require('fs');
const { Book } = require('../models');
const { paginate } = require('../utils/paginate');

const getBooks = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    // fetch all authors
    if (limit === 10 && page === 1) {
      const books = await Book.findAll();
      return res.status(200).send(books);
    }

    const offset = paginate(page, limit);

    // fetch paginated author
    const authors = await Book.findAll({
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
 * Create new Book.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const createBook = async (req, res) => {
  try {
    // add book
    let filePath;
    if (req.files) {
      const { file } = req.files;
      const fileName = new Date().toISOString() + file.name;
      filePath = path.join(__dirname, '../', 'public', fileName);
      file.mv(filePath, (err) => {
        if (err) console.log(err);
      });
    }
    // create book
    const { name, authorId, description } = req.body;
    const bookCreated = Book.create({
      name,
      description,
      AuthorId: authorId,
      path: filePath || null,
    });
    return res.status(201).send({ book: bookCreated.dataValues });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
/**
 * Create new Movie.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const serveBooks = async (req, res) => {
  try {
    const pdfDirectory = path.join(
      __dirname,
      '../',
      'public',
      'sports-07-00127 (2).pdf'
    );
    fs.readFile(pdfDirectory, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
/**
 * Delete a book record.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.destroy({ where: { id } });

    if (book === 0)
      return res
        .status(404)
        .send({ error: 'The book you are trying to delete was not found' });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const countBook = async (req, res) => {
  try {
    const bookCount = await Book.count();

    return res.status(200).send({ bookCount });
  } catch (error) {
    return res.status(500).send(error);
  }
};
/**
 * Get a Author by id.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id, {});

    if (!book) {
      return res.status(404).send({ error: 'Book not found' });
    }

    return res.status(200).send(Book);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
module.exports = {
  createBook,
  serveBooks,
  getBooks,
  deleteBook,
  countBook,
  getBookById,
};

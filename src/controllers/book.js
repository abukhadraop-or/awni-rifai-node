// var static = require('node-static');

const path = require('path');
const fs = require('fs');

/**
 * Create new Book.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const createBook = async (req, res) => {
  try {
    console.log(req.files.file.name);
  } catch (err) {
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
module.exports = {
  createBook,
  serveBooks,
};

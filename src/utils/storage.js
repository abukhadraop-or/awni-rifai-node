const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, '../public/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.name);
  },
});

const uploads = multer({ dest: '../public/' });

module.exports = {
  uploads,
};

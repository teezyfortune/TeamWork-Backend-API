const multer = require('multer');
const DataUri = require('datauri');
const path = require('path');

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('gif');

const dataUri = new DataUri();

const dUrl = (req) =>
  dataUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

module.exports = { multerUploads, dUrl };

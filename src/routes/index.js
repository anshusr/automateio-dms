const express = require('express');
const router = express.Router();
const Files = require('../dal/files');
const { handleError } = require('../utils');

router.get('/', handleError(displayIndex));

async function displayIndex(req, res) {
  const userId = req.session.user._id;
  const path = req.query.path || '';
  const pathArray = path.split(',');
  const prevPath = pathArray.slice(0, pathArray.length - 1).join(',');
  const breadcrumbPath = ['root'].concat(path.split(',')).join(' > ');

  const files = await Files.getFilesInFolder(userId, path);

  res.render('index', { files, path, prevPath, breadcrumbPath });
}

module.exports = router;

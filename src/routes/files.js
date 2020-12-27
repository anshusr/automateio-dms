const express = require('express');
const router = express.Router();
const Files = require('../dal/files');
const { handleError } = require('../utils');

router.get('/', handleError(getFile));
router.post('/', handleError(uploadFile));

async function getFile(req, res) {
  const id = req.query.id || '';
  const userId = req.session.user._id;
  const file = await Files.getFile(id, userId);
  const content = (file && file.content);
  res.render('file', { content })
}

async function uploadFile(req, res) {
  const userId = req.session.user._id;
  const { name, path = '', content = null, isFolder } = req.body;
  await Files.add(name, isFolder, userId, path, content)
  res.redirect(`/?path=${req.body.path}`);
}

module.exports = router;
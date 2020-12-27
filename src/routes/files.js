const express = require('express');
const router = express.Router();
const Files = require('../dal/files');

router.post('/', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  const userId = req.session.user._id;
  const { name, path = '', content = null, isFolder } = req.body;
  await Files.add(name, isFolder, userId, path, content)
  res.redirect(`/?path=${req.body.path}`);
});

router.get('/', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  const id = req.query.id || '';
  const userId = req.session.user._id;
  const file = await Files.getFile(id, userId);
  const content = (file && file.content);
  res.render('file', { content })
});

module.exports = router;
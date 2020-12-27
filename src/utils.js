
function handleError(fn, shouldAuth = true) {
  return function (req, res, next) {
    if (shouldAuth && !req.session.user) {
      return res.redirect('/login');
    }
    fn(req, res, next).catch(next);
  };
}

module.exports = { handleError }

function checkUsernameExists(req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.status(401).json({
      message: 'Username and password required',
    });
  } else {
    next();
  }
}

module.exports = {
  checkUsernameExists,
};

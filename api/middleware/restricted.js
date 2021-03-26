const jwt = require('jsonwebtoken');
const { jstSecret } = require('../../config/secret');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      message: 'Token Required',
    });
  } else {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: 'Token Invalid',
        });
      } else {
        req.decodeJwt = decoded;
        next();
      }
    });
  }
};

const jwt = require('jsonwebtoken');

function buildToken(user) {
  const payload = {
    subject: user.id,
    username: user.name,
    role: user.role,
  };
  const config = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, 'shh', config);
}

module.exports = {
  buildToken,
};

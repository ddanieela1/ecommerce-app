import jwt from 'jsonwebtoken';
// const { jwt } = require('jsonwebtoken');
// const jwt = require('jsonwebtoken');

const signToken = (user) => {
  try {
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },

      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      }
    );

    return token;
  } catch (error) {
    console.error('Error signing in with JWT:', error);
    throw new Error('JWT signing failed');
  }
};

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Token is invalid' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'Token is not provided' });
  }
};

module.exports = { signToken, isAuth };

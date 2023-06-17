import jwt from 'jsonwebtoken';
// const { jwt } = require('jsonwebtoken');

const signToken = (user) => {
  return jwt.sign(
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
};

// module.exports = {
//   signToken,
// };

// module.exports = signToken;
// export { signToken };
module.exports = { signToken };

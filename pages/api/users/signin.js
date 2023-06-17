// import nc from 'next-connect';
// import bcrypt from 'bcryptjs';
// import db from '../../../utils/db';
// import User from '../../../models/User';
// import { signToken } from '../../../utils/auth';

const bcrypt = require('bcryptjs');
const db = require('../../../utils/db');
const { User } = require('../../../models/User').default;
const { signToken } = require('../../../utils/auth');
const nc = require('next-connect');

const handler = nc();

// // post request for authentication
// handler.post(async (req, res) => {
//   await db.connect();

//   // search for user in db
//   const user = await User.findOne({ email: req.body.email });
//   await db.disconnect();

//   // compare plain text to encrypted text
//   if (user && bcrypt.compareSync(req.body.password, user.password)) {
//     const token = signToken(user);
//     res.send({
//       token,
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     });
//   } else {
//     res.status(401).send({ message: 'Invalid username or password' });
//   }
// });

// post request for authentication
handler.post(async (req, res) => {
  try {
    await db.connect();

    // search for user in db
    const user = await User.findOne({ email: req.body.email });
    await db.disconnect();

    // compare plain text to encrypted text
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = signToken(user);
      res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
      console.log(token, user._id, user.name, user.email, user.isAdmin);
    } else {
      res.status(401).send({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
    console.error(error);
  }
});

module.exports = handler;

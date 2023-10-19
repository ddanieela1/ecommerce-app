import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import db from '../../../utils/db';
import User from '../../../models/User';
import { signToken } from '../../../utils/auth';

// const bcrypt = require('bcryptjs');
// const db = require('../../../utils/db');
// const { User } = require('../../../models/User').default;
// const { signToken } = require('../../../utils/auth');
// const nc = require('next-connect');

const handler = nc();

// post request for authentication
handler.post(async (req, res) => {
  console.log('Attempting to connect to the database...');
  try {
    await db.connect();
    console.log('Connected to the database successfully!');

    // search for user in db

    const user = await User.findOne({ email: req.body.email });
    console.log('recieved email', req.body.email);
    console.log('recieved passoword', req.body.password);
    console.log(req.body.email);
    console.log(user);
    await db.disconnect();

    // compare plain text to encrypted text
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      console.log('Received password:', req.body.password);
      console.log('Stored password hash:', user.password);
      console.log('password is correct');
      const token = signToken(user);
      console.log('Generated token:', token);
      res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
      console.log(token, user._id, user.name, user.email, user.isAdmin);
      console.log('Generated token:', token);
    } else {
      res.status(401).send({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
    console.error(error);
  }
});

module.exports = handler;

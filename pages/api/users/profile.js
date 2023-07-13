// import nc from 'next-connect';
// import bcrypt from 'bcryptjs';
// import db from '../../../utils/db';
// import User from '../../../models/User';
// import { signToken } from '../../../utils/auth';

const bcrypt = require('bcryptjs');
const db = require('../../../utils/db');
const { User } = require('../../../models/User').default;
const { signToken, isAuth } = require('../../../utils/auth');

const nc = require('next-connect');

const handler = nc();
handler.use(isAuth);

// post request for authentication
handler.put(async (req, res) => {
  await db.connect();

  const user = await User.findById({ email: req.user._id });
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password
    ? bcrypt.hashSync(req.body.password)
    : user.password;
  await user.save();
  await db.disconnect();
});

export default handler;

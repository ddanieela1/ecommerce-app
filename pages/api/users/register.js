import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import db from '../../../utils/db';
import { User } from '../../../models/User';
import { signToken } from '../../../utils/auth';

const handler = nc();

// post request for authentication
handler.post(async (req, res) => {
  await db.connect();

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
  });

  // search for user in db
  const createdUser = await newUser.save();
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
  }
});

export default handler;

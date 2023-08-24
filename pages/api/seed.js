import nc from 'next-connect';
import db from '../../utils/db';
import data from '../../utils/data';
import Product from '../../models/Product';
import User from '../../models/User';
import { users, products } from '../../utils/data';

const handler = nc();
// const bodyParser = require('body-parser');

handler.get(async (req, res) => {
  // app.use(bodyParser.urlencoded({ extended: true }));
  await db.connect();
  await User.deleteMany();
  console.log('User data:', users);
  await User.insertMany(users);
  await Product.deleteMany();
  await Product.insertMany(products);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
});

export default handler;

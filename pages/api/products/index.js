import nc from 'next-connect';
import db from '../../../utils/db';
import Product from '../../../models/Product';
import path from 'path';
import { promises as fs } from 'fs';

const handler = nc();

handler.get(async (req, res) => {
  // const jsonDirectory = path.join(process.cwd(), 'json');

  // const fileContents = await fs.readFile(jsonDirectory + '/data.js', 'utf8');

  // res.status(200).json(fileContents);

  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

export default handler;

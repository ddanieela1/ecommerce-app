import nc from 'next-connect';
import db from '../../../utils/db';
import Product from '../../../models/Product';
import path from 'path';
import { promises as fs } from 'fs';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

export default handler;

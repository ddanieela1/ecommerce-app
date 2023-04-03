import nc from 'next-connect';
import db from '../../../utils/db';
import Product from '../../../models/Product';
import path from 'path';
import { promises as fs } from 'fs';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
});

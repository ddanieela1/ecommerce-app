import nc from 'next-connect';
import db from '../../../utils/db';
import Order from '../../../models/Order';
import path from 'path';
import { promises as fs } from 'fs';
import { onError } from '../../../utils/error';
import { isAuth } from '../../../utils/auth';

const handler = nc({
  onError,
});
handler.use(isAuth);
handler.post(async (req, res) => {
  await db.connect();
  const newOrder = await Order({
    ...req.body,
    user: req.user_id,
  });
  const order = await newOrder.save();
  res.status(201).send(order);
});

export default handler;

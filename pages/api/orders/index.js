import nc from 'next-connect';
import db from '../../../utils/db';
import Order from '../../../models/Order';
import path from 'path';
import { promises as fs } from 'fs';
import { onError } from '../../../utils/error';
import { getError } from '../../../utils/error';
import { isAuth } from '../../../utils/auth';

const handler = nc({
  onError,
});
handler.use(isAuth);
handler.post(async (req, res) => {
  try {
    console.log('Recieved order data:', req.body);
    await db.connect();
    const newOrder = await Order({
      ...req.body,
      user: req.user._id,
    });
    console.log('New order to be saved', newOrder);
    const order = await newOrder.save();
    console.log('Order saved successfullt', order);
    res.status(201).send(order);
  } catch (err) {
    console.log('Error while saving order', err);
    await onError(err, req, res);

    res.status(500).json({ message: 'Something went wrong.' });
  }
});

export default handler;

import nc from 'next-connect';
import db from '../../../utils/db';
import Order from '../../../models/Order';
import { isAuth } from '../../../utils/auth';
import { onError } from '../../../utils/error';
const mongoose = require('mongoose');

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.get(async (req, res) => {
  try {
    console.log('Recieved query parameters:', req.query);
    const userId = req.query._id;
    if (!userId) {
      return res.status(400).json({ error: 'Missing user ID in request' });
    }

    await db.connect();

    const orders = await Order.find({ user: userId }).populate('user');

    console.log('Sending orders to client', orders);
    res.send(orders);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default handler;

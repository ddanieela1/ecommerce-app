import nc from 'next-connect';
import db from '../../../utils/db';
import { isAuth } from '../../../utils/auth';

const handler = nc();

handler.get(async (req, res) => {
  handler.use(isAuth);
  handler.get(async (req, res) => {
    res.send(PROCESS.ENV.PAYPAL_CLIENT_ID || 'SB');
  });
});

export default handler;

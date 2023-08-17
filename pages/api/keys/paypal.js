import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';

const handler = nc();

handler.get(async (req, res) => {
  handler.use(isAuth);
  handler.get(async (req, res) => {
    res.send(PROCESS.ENV.PAYPAL_CLIENT_ID || 'sb');
  });
});

export default handler;

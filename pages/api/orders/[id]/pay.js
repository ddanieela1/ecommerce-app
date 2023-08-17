// import nc from 'next-connect';
// import db from '../../../../utils/db';
// import Order from '../../../../models/Order';
// import { isAuth } from '../../../../utils/auth';
// import { onError } from '../../../../utils/error';
// import { getError } from '../../../../utils/error';

// const handler = nc();
// handler.use(isAuth);

// handler.put(async (req, res) => {
//   try {
//     await db.connect();
//     const order = await Order.findById(req.query.id);
//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         id: req.body.id,
//         status: req.body.status,
//         email_address: req.body.email_address,
//       };
//       const paidOrder = await order.save();
//       await db.disconnect();
//       res.send({ message: 'Thank you. Order is paid.', order: paidOrder });
//     } else {
//       await db.disconnect();
//       res.status(404).send({ message: 'Order not found.' });
//       res.send(order);
//     }
//   } catch (error) {
//     await db.disconnect();
//     res.status(500).send({ message: getError(error) });
//   }
// });

// export default handler;
import nc from 'next-connect';
import db from '../../../../utils/db';
import Order from '../../../../models/Order';
import { isAuth } from '../../../../utils/auth';
import { onError } from '../../../../utils/error';

const handler = nc({ onError });
handler.use(isAuth);

handler.use(isAuth);
handler.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const paidOrder = await order.save();
    await db.disconnect();
    res.send({ message: 'Thank you. Order is paid.', order: paidOrder });
  } else {
    await db.disconnect();
    console.log('something went wrong');
    res.status(404).send({ message: 'Order not found.' });
  }
});

export default handler;
// import nc from 'next-connect';
// import db from '../../../../utils/db';
// import Order from '../../../../models/Order';
// import { isAuth } from '../../../../utils/auth';
// import { getError, onError } from '../../../../utils/error';

// const handler = nc({ onError });
// handler.use(isAuth);

// handler.use(isAuth);
// handler.put(async (req, res) => {
//   console.log('Updatong orer as paid', req.query.id);
//   try {
//     await db.connect();
//     const order = await Order.findById(req.query.id);
//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         id: req.body.id,
//         status: req.body.status,
//         email_address: req.body.email_address,
//       };
//       const paidOrder = await order.save();
//       console.log('order paid', paidOrder); // Update the order and get the updated version
//       await db.disconnect();
//       res.send({ message: 'Thank you. Order is paid.', order: paidOrder }); // Send the updated order in the response
//     } else {
//       await db.disconnect();
//       console.log('something went wrong');
//       res.status(404).send({ message: 'Order not found.' });
//     }
//   } catch (error) {
//     console.log('Error', error);
//     await db.disconnect();
//     res.status(500).send({ message: getError(error) });
//   }
// });

// export default handler;

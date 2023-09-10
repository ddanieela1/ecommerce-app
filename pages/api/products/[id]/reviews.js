import mongoose from 'mongoose';
import onError from '../../../../utils/error';
import db from '../../../../utils/db';
import { isAuth } from '../../../../utils/auth';
import Product from '../../../../models/Product';
import nextConnect from 'next-connect';
import { distDir } from '@/next.config';

const handler = nextConnect({ onError });

handler.get(async (req, res) => {
  await db.connect();
  try {
    // console.log(product);
    const product = await Product.findById(req.query.id);
    console.log('finding product:', req.query.id);
    console.log(product);
    if (product) {
      res.send(product);
      console.log('product found', product);
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  } finally {
    await db.disconnect();
    // res.statusCode(404).send({ message: ' Product not found' });
  }
});

handler.use(isAuth).post(async (req, res) => {
  try {
    await db.connect();
    const product = await Product.findById(req.query.id);
    console.log('finding product:', req.query.id);
    if (product) {
      console.log(product);
      //   const existReview = product.reviews.find((p) => p.user === req.user._id);
      // }
      // if (existReview) {
      //   const existReview = product.reviews.find((p) => p.user === req.user._id);
      // }
      const review = {
        user: new mongoose.Types.ObjectId(req.user._id),
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      await product.save();
      await db.disconnect();
      res.status(201).send({
        message: 'Review submitted',
      });
      console.log('posting review:', review);
      const updatedProduct = await Product.findById(req.query.id);
      updatedProduct.numReviews = updatedProduct.reviews.length;
      updatedProduct.rating =
        updatedProduct.reviews.reduce((a, c) => c.rating + a, 0) /
        updatedProduct.numReviews;
    }
  } catch (error) {
    console.error(error);
    await db.disconnect();
    res.status(404).send({
      message: 'Review not posted,product not found',
    });
  }

  // await updatedProduct.save();
  // await db.disconnect();
  // return res.send({ message: 'Review updated' });
  // } else {

  // }
});

export default handler;

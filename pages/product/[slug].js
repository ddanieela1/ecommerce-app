import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  ListItem,
  Typography,
  Card,
  Button,
  Rating,
  TextField,
  CircularProgress,
} from '@mui/material';
import NextLink from 'next/link';
import Image from 'next/image';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Layout from '../../components/Layout';

// models
import Product from '../../models/Product';

// files
import db from '../../utils/db.js';
import { Store } from '../../utils/Store';
import { enqueueSnackbar } from 'notistack';
import { getError } from '../../utils/error';
import { form } from 'react-hook-form';

export default function ProductView(props) {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { product } = props;

  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('posting review:', rating, comment);
    try {
      await axios.post(
        `/api/products/${product._id}/reviews`,
        {
          rating,
          comment,
        },

        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setLoading(false);
      enqueueSnackbar('Review submitted!', {
        variant: 'success',
      });
      fetchReviews();
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), {
        variant: 'error',
      });
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/products/${product._id}/reviews`);
      setReviews(data.reviews);
      console.log('fetching reviews:', data.reviews);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (!product) {
    return <div>Product is not available at this time.</div>;
  }

  const handleAddToCart = async () => {
    const itemExists = state.cart.cartItems.find((p) => p._id === product._id);
    const quantity = itemExists ? itemExists.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.inStock < quantity) {
      window.alert('Product out of stock');
      return;
    }
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
    router.push('/cart');
  };

  // const reviewsToFetch = product.reviews;
  // const reviewsToArr = reviewsToFetch.split(',');
  // console.log(reviewsToArr);

  return (
    <Layout title={product.name}>
      <div>
        <NextLink href="/" passHref>
          <Link>Back to all products</Link>
        </NextLink>

        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <img
              src={product.image}
              alt={product.name}
              height={640}
              width={640}
              layout="responsive"
            />
          </Grid>

          <Grid item md={3} xs={12}>
            <List>
              <ListItem>
                <Typography component="h1">Category: {product.name}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Category: {product.category}</Typography>
              </ListItem>

              <ListItem>
                <Typography>Brand: {product.brand}</Typography>
              </ListItem>
              <ListItem>
                <Typography> {product.description}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Rating: {product.rating}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Reviews: {product.numReviews}</Typography>
              </ListItem>
            </List>
          </Grid>

          <Grid md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Price:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{product.price}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {product.inStock > 0 ? (
                          <Button
                            fullWidth="variant"
                            color="primary"
                            onClick={handleAddToCart}
                          >
                            Add to Cart
                          </Button>
                        ) : (
                          'Unavailable'
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <List>
            <ListItem>
              <Typography>Costumer Reviews</Typography>
            </ListItem>
            {reviews.length === 0 && <ListItem>No Review</ListItem>}
            {reviews.map((review) => (
              <ListItem key={review._id}>
                <Grid container>
                  <Grid item>
                    <Typography>
                      <strong>{review.name}</strong>
                    </Typography>

                    {review.createdAt && (
                      <Typography>
                        {review.createdAt.substring(0, 10)}
                      </Typography>
                    )}
                  </Grid>
                  <Grid>
                    <Rating value={parseInt(review.rating)} readOnly />
                    <Typography>{review.comment}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
          <ListItem>
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <List>
                  <ListItem>
                    <Typography>Leave your review:</Typography>
                  </ListItem>
                  <ListItem>
                    <TextField
                      multiline
                      variant="outlined"
                      fullWidth
                      name="review"
                      label="Enter Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </ListItem>
                  <ListItem>
                    <Rating
                      name="simple-controlled"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </ListItem>
                  <ListItem>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                    {loading && <CircularProgress></CircularProgress>}
                  </ListItem>
                </List>
              </form>
            ) : (
              <Typography>
                Please {''}
                <Link href={`/signin?redirect=/product/${product.slug}`}>
                  login
                </Link>
                {''} to write a review
              </Typography>
            )}
          </ListItem>
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }, '-reviews').lean();
  await db.disconnect();
  return {
    props: {
      // product: db.convertDocToObj(product),
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

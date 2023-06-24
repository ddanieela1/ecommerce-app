import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ListItem, Typography, Card, Button } from '@mui/material';
import NextLink from 'next/link';
import Image from 'next/image';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Layout from '../../components/Layout';

// models
import Product from '@/models/Product.js';

// files
import db from '@/utils/db.js';
import { Store } from '../../utils/Store';

export default function ProductView(props) {
  const { state, dispatch } = useContext(Store);
  const { product } = props;
  const router = useRouter();

  if (!product) {
    return <div>Product is not available at this time</div>;
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

  return (
    <Layout title={product.name}>
      <div>
        <NextLink href="/" passHref>
          <Link>Back to all products</Link>
        </NextLink>

        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Image
              src={product.image}
              alt={product.name}
              height={640}
              width={640}
              // layout="responsive"
            ></Image>
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
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}

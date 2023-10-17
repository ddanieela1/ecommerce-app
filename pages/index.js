import { useContext, useEffect } from 'react';
import NextLink from 'next/link';
import axios from 'axios';
import Image from 'next/image';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import db from '../utils/db';
import Product from '../models/Product';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

import { styled } from '@mui/system';

import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Grid,
  Card,
} from '@mui/material';

const CarouselContainer = styled('div')({
  marginTop: '20px',
  backgroundColor: '#ffffff',
});

// const ShopNowButton = styled(Button)({
//   position: 'absolute',
//   bottom: '20px',
//   left: '50%',
//   transform: 'translateX(-50%)',
// });

export default function Home(props) {
  const router = useRouter();
  const { products, featuredProducts } = props;
  const { state, dispatch } = useContext(Store);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (featuredProducts.length > 0) {
      setDataLoaded(true);
    }
  }, [featuredProducts]);

  const addToCartHandler = async (product) => {
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

  console.log('featuredProducts', featuredProducts);
  console.log('featuredProducts length', featuredProducts.length);
  return (
    <Layout>
      <CarouselContainer style={{ margin: '20px 0' }}>
        {dataLoaded ? (
          <Carousel showThumbs={false} autoPlay>
            {featuredProducts.map((product) => {
              console.log('featuredProducts:', product);
              return (
                <div>
                  <NextLink href={`/product/${product.slug}`}>
                    <Image
                      src={product.banner}
                      alt={product.name}
                      width={300}
                      height={300}
                      loading="lazy"
                      responsive
                    />
                  </NextLink>
                </div>
              );
            })}
          </Carousel>
        ) : (
          <p>Loading ...</p>
        )}
      </CarouselContainer>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item md={4} key={product.name}>
            <Card>
              <NextLink href={`/product/${product.slug}`} passHref>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product.image}
                    title={product.name}
                    alt={product.name}
                    sx={{ height: 140 }}
                  ></CardMedia>
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </NextLink>
              <CardActions
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <Typography>${product.price}</Typography>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => addToCartHandler(product)}
                  sx={{ marginLeft: 'auto' }}
                >
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  console.log('Fetching products...');
  await db.connect();
  const products = await Product.find({}).lean();
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  console.log('Products:', products);
  console.log('Featured Products:', featuredProducts);
  await db.disconnect();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      featuredProducts: JSON.parse(JSON.stringify(featuredProducts)),
    },
  };
}

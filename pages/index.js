import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { styled } from '@mui/system';
import Image from 'next/image';

import NextLink from 'next/link';
import axios from 'axios';
import Layout from '../components/Layout';

import { useContext, useEffect } from 'react';
import db from '../utils/db';
import Product from '../models/Product';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Store } from '../utils/Store';
import { Carousel } from 'react-responsive-carousel';
import { users, products } from '../utils/data';

// import pen_set from '../public/images/pen_set.jpg';

// const carouselContainer = {
//   marginBottom: '80px',
//   backgroundColor: '#ffffff',
// };

const CarouselContainer = styled('div')({
  marginTop: '20px',
  backgroundColor: '#ffffff',
});

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
      <CarouselContainer>
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
                      // style={{ height: 'auto' }}
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
      {/* <h1>Products</h1> */}
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
                  >
                    {/* <img src={product.image}></img> */}
                  </CardMedia>
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </NextLink>
              <CardActions>
                <Typography>${product.price}</Typography>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => addToCartHandler(product)}
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
      // products: products.map(db.convertDocToObj),
      // featuredProducts: featuredProducts.map(db.convertDocToObj),
    },
  };
}

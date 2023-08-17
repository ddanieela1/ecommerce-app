// import CardActionArea from '@mui/material/CardActionArea';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import CardActions from '@mui/material/CardActions';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';

// import React from 'react';

// export default function Product(product, addToCartHandler) {
//   return (
//     <Card>
//       <NextLink href={`/product/${product.slug}`} passHref>
//         <CardActionArea>
//           <CardMedia
// image={require('assets/img/bluepen.jpeg')}
//             component="img"
//             title={product.name}
//             image={product.image}
//           ></CardMedia>

//           <CardContent>
//             <Typography>{product.name}</Typography>
//           </CardContent>
//         </CardActionArea>
//       </NextLink>
//       <CardActions>
//         <Typography>${product.price}</Typography>
//         <Button
//           size="small"
//           color="primary"
//           onClick={() => addToCartHandler(product)}
//         >
//           Add to cart
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }

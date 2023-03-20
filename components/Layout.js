import React, { children } from 'react';
import Head from 'next/head';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
// import { createTheme } from '@mui/material/styles';
// import useStyles from '@/utils/styles';

// const theme = createTheme({
//   grow: {
//     flexGrow: 1,
//   },
// });

export default function Layout({ children }) {
  // const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Bingo</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <NextLink href="/" passHref>
            <Link>
              <Typography color="white">Bingo</Typography>
            </Link>
          </NextLink>
          {/* <div className={classes.grow}></div> */}
          <div>
            <NextLink href="/cart" passHref>
              <Link>Cart</Link>
            </NextLink>

            <NextLink href="/login" passHref>
              <Link>Log In</Link>
            </NextLink>
          </div>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
      <footer>
        <Typography sx={{ textAlign: 'center' }}>
          All rights reserved. Bingo@2023
        </Typography>
      </footer>
    </div>
  );
}

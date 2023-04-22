import React, { title, children, useContext } from 'react';
import { useEffect } from 'react';
import Head from 'next/head';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import NextLink from 'next/link';
import Badge from '@mui/material/Badge';
import { Store } from '../utils/Store';
import { styled } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

// const mystyle = {
//   color: 'white',
//   backgroundColor: 'DodgerBlue',
//   padding: '10px',
//   fontFamily: 'Arial',
// };

const NavLink = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#4F5361',
  fontWeight: 'bold',
  cursor: 'pointer',
  '&:hover': {
    color: '#fff',
  },
}));

const NavbarLinksBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const NavBarContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  backgroundColor: 'transparent',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(5),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

export default function Layout({ children }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  return (
    <div>
      <Head>
        <title>{title ? `${title}-Bingo` : 'Bingo'}</title>
      </Head>
      <NavBarContainer>
        {/* <AppBar position="static"> */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
          }}
        >
          <NavbarLinksBox>
            <NavLink variant="body1">
              <Typography>Bingo</Typography>
            </NavLink>

            <NavLink variant="body2">
              <NextLink href="/featured" passHref>
                Featured Products
              </NextLink>
            </NavLink>

            <NavLink variant="body2">
              <NextLink href="/best-sellers" passHref>
                Best Sellers
              </NextLink>
            </NavLink>
            <NavLink variant="body2">
              <NextLink href="/best-sellers" passHref>
                New Arrivals
              </NextLink>
            </NavLink>
          </NavbarLinksBox>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <NavLink variant="body1">
            <NextLink href="/cart" passHref>
              {cart.cartItems.length > 0 ? (
                <Badge color="secondary" badgeContent={cart.cartItems.length}>
                  Cart
                </Badge>
              ) : (
                'Cart'
              )}
            </NextLink>
          </NavLink>

          <NavLink>
            <NextLink href="/signIn" passHref>
              Sign In
            </NextLink>
          </NavLink>

          {/* <Toolbar> */}
          {/* <NextLink href="/" passHref>
            <Typography color="white">Bingo</Typography>
          </NextLink> */}
          {/* </Toolbar> */}
          {/* </AppBar> */}
        </Box>
      </NavBarContainer>
      <Container>{children}</Container>

      <footer>
        <Typography sx={{ textAlign: 'center' }}>
          All rights reserved. Bingo@2023
        </Typography>
      </footer>
    </div>
  );
}

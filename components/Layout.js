import React, { title, children, useEffect, useState, useContext } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';

import Head from 'next/head';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import NextLink from 'next/link';
import Badge from '@mui/material/Badge';
import { Menu, MenuItem, styled } from '@mui/material';
import Button from '@mui/material/Button';

import { useRouter } from 'next/router';
import { Store } from '../utils/Store';
import { USER_LOGOUT, USER_SIGNIN } from '../utils/Store';

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

// const navBarButton = styled(Button)(({ theme }) => ({
//   color: 'white',
//   textTransform: 'initial',
// }));

const navBarButton = {
  color: 'black',
  // backgroundColor: 'white',
  textTransform: 'initial',
  backgroundColor: 'transparent',
};

export default function Layout({ children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [anchorEl, setAnchorEl] = useState(null);

  const signinClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const signinMenuCloseHandler = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch({ type: USER_LOGOUT });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/signin');
  };

  return (
    <div>
      <Head>
        <title>{title ? `${title}-Bingo` : 'Bingo'}</title>
      </Head>
      <NavBarContainer>
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
            {userInfo ? (
              <>
                <Button
                  // sx={{ color: 'white' }}
                  style={navBarButton}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={signinClickHandler}
                >
                  {userInfo.name}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={signinMenuCloseHandler}
                >
                  <MenuItem onClick={signinMenuCloseHandler}>Profile</MenuItem>
                  <MenuItem onClick={signinMenuCloseHandler}>
                    My Account
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <NextLink href="/signin" passHref>
                Sign In
              </NextLink>
            )}
          </NavLink>
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

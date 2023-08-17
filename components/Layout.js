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
import { CssBaseline, Menu, MenuItem, styled } from '@mui/material';
import Button from '@mui/material/Button';

import { useRouter } from 'next/router';
import { Store } from '../utils/Store';
import { USER_LOGOUT, USER_SIGNIN } from '../utils/Store';
import MenuIcon from '@material-ui/icons/Menu';

// const NavLink = styled(Typography)(({ theme }) => ({
//   fontSize: '14px',
//   color: '#4F5361',
//   fontWeight: 'bold',
//   cursor: 'pointer',
//   '&:hover': {
//     color: '#fff',
//   },
// }));

// const NavbarLinksBox = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   gap: theme.spacing(6),
//   [theme.breakpoints.down('md')]: {
//     display: 'none',
//   },
// }));

// const NavBarContainer = styled(Container)(({ theme }) => ({
//   display: 'flex',
//   backgroundColor: 'black',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   padding: theme.spacing(5),
//   [theme.breakpoints.down('md')]: {
//     padding: theme.spacing(2),
//   },
// }));

// const navBarButton = styled(Button)(({ theme }) => ({
//   color: 'white',
//   textTransform: 'initial',
// }));

const navBarButton = {
  color: '#ffffff',
  textTransform: 'initial',
};

export default function Layout({ children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [anchorEl, setAnchorEl] = useState(null);

  const signinClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const signinMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
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

      <CssBaseline />
      <AppBar
        sx={{
          backgroundColor: 'green',
          '& a': {
            color: '#ffffff',
            marginLeft: 10,
          },
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* <NavBarContainer> */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              // justifyContent: 'center',
              // gap: '2.5rem',
            }}
          >
            <MenuIcon />
            <NextLink href="/" passHref>
              <Link>
                <Typography>Bingo</Typography>
              </Link>
            </NextLink>

            <NextLink href="/featured" passHref>
              <Link>
                <Typography>featured</Typography>
              </Link>
            </NextLink>

            <NextLink href="/best-sellers" passHref>
              <Link>
                <Typography>Best Sellers</Typography>
              </Link>
            </NextLink>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <NextLink href="/cart" passHref>
              <Link>
                <Typography component="span">
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      Cart
                    </Badge>
                  ) : (
                    'Cart'
                  )}
                </Typography>
              </Link>
            </NextLink>

            {/* <NavLink> */}
            {userInfo ? (
              <>
                <Button
                  // sx={{ color: 'white' }}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={signinClickHandler}
                  style={navBarButton}
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
                  <MenuItem
                    onClick={(e) => signinMenuCloseHandler(e, '/profile')}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => signinMenuCloseHandler(e, '/order-history')}
                  >
                    Order History
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <NextLink href="/signin" passHref>
                Sign In
              </NextLink>
            )}
            {/* </NavLink> */}
          </Box>
          {/* </NavBarContainer> */}
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

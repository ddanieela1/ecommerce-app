import React, { children } from 'react';
import Head from 'next/head';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Bingo</title>
      </Head>
      <AppBar position="static" sx={{ backgroundColor: '#d9c7b6' }}>
        <Toolbar>
          <Typography>Bingo</Typography>
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

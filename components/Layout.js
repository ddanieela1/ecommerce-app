import React, { Children } from 'react';
// import Children from 'react';
import Head from 'next/head';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Layout({ Children }) {
  return (
    <div>
      <Head>
        <title>Bingo</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography>Bingo</Typography>
        </Toolbar>
      </AppBar>
      <Container>{Children}</Container>
    </div>
  );
}

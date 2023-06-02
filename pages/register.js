import React from 'react';
import { Typography, Box, TextField, Paper, Grid, Button } from '@mui/material';

export default function Register() {
  const paperStyle = {
    padding: 2,
    width: 400,
    margin: '0 auto',
    // padding: 20,
    // height: '90vh',
    // width: 600,
    // margin: '80px auto',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper sx={paperStyle}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              Register
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ width: '100%' }}>
            <TextField label="First Name" variant="filled" />
          </Grid>

          <Grid item xs={6} sx={{ width: '100%' }}>
            <TextField variant="filled" label="Last Name" />
          </Grid>

          <Grid item xs={6}>
            <TextField
              align="center"
              variant="filled"
              label="Password"
              type="password"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              align="center"
              variant="filled"
              label="Re-type Password"
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              align="center"
              variant="filled"
              id="outlined-email"
              label="Email"
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

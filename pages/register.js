import React from 'react';
import { Typography, Box, TextField, Paper, Grid } from '@mui/material';

export default function Register() {
  const paperStyle = {
    padding: 20,
    height: '60vh',
    width: 500,
    margin: '80px auto',
  };

  return (
    <Paper sx={paperStyle}>
      <Grid container spacing={2}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
          noValidate
          autoComplete="off"
        >
          {/* <div>
          <Typography variant="h5">Register</Typography>
        </div> */}
          <Grid item xs>
            <TextField required id="outlined-required" label="First Name" />
          </Grid>

          <Grid item xs>
            <TextField required id="outlined-required" label="Last Name" />
          </Grid>

          <div>
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="password"
            />
          </div>

          <div>
            <TextField
              required
              id="outlined-password-input"
              label="Retype Password"
              type="password"
              autoComplete="password"
            />
          </div>

          <div>
            <TextField
              id="outlined-email"
              label="Email"
              type="email"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </Box>
      </Grid>
    </Paper>
  );
}

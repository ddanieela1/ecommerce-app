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
    <Paper sx={paperStyle} elevation={10}>
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
        <Typography variant="h5">Register</Typography>
        <div>
          <TextField
            required
            id="outlined-required"
            label="First Name"
            grid-xs-7
            spacing-xs-1
          />
        </div>

        <div>
          <TextField
            required
            id="outlined-required"
            label="Last Name"
            grid-xs-2
          />
        </div>

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
    </Paper>
  );
}

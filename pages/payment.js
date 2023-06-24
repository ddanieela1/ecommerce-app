import Layout from '../components/Layout';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect } from 'react';

import { Store } from '../utils/Store';
import CheckoutWizard from '@/components/checkoutWizard';
import {
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { Button, FormControl } from '@mui/base';
import { useSnackbar } from 'notistack';

export default function Payment() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { paymentMethod, setPaymentMethod } = useState('');
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;

  // useEffect(() => {
  //   if (!shippingAddress.address) {
  //     router.push('/shipping');
  //   } else {
  //     setPaymentMethod(Cookies.get('paymentMethod'));
  //   }
  // }, []);
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Layout title="Payment">
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <form onClick={submitHandler}>
        <Typography>Payment Method</Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
              ></RadioGroup>

              <FormControlLabel
                label="PayPal"
                value="PayPal"
                control={<Radio />}
              ></FormControlLabel>
            </FormControl>
          </ListItem>

          <ListItem>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="submit"
              variant="outlined"
              color="primary"
              onClick={() => {
                router.push('/shipping');
              }}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}

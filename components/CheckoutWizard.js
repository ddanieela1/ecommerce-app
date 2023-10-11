import { StepLabel, Stepper, Step } from '@mui/material';
import React from 'react';

export default function CheckoutWizard({ activeStep = 0 }) {
  const stepperStyle = {
    backgroundColor: 'transparent',
    margin: '20px',
  };

  return (
    <Stepper style={stepperStyle} activeStep={activeStep} alternativeLabel>
      {['Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        )
      )}
    </Stepper>
  );
}

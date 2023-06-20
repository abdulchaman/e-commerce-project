import React,{useState} from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';

import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import useStyles from "./styles";

const steps = ['Shipping address', 'Payment details'];

const Checkout = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const Confirmation = ()=>{
    return(
      <div>
        Confirmation
      </div>
    )
  }
  const Form = ()=>{
    if(activeStep === 0){
      return (
        <AddressForm></AddressForm>
      )
    }
    else{
      return(
        <PaymentForm></PaymentForm>
      )
    }
  } 
  return (
    <>
      <div className={classes.toolbar}></div>
      <main>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {
              steps.map((step)=>{
                return(
                  <Step key={step}>
                    <StepLabel>{step}</StepLabel>
                  </Step>
                )
              })
            }
          </Stepper>
          {activeStep === steps.length ? <Confirmation></Confirmation> : <Form></Form>}
        </Paper>
      </main>
    </>
  )
}

export default Checkout;
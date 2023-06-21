import React,{useState, useEffect} from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';

import { commerce } from "../../../lib/commerce";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import useStyles from "./styles";

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);

  useEffect(()=>{
    const generateToken = async()=>{
      try{
          // const token = ;
          setCheckoutToken(await commerce.checkout.generateToken(cart.id, {type:'cart'}));
      }
      catch(error){
          console.log("error:", error)
      }
    }
    generateToken();
  },[cart]);

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
        <AddressForm checkoutToken={checkoutToken}></AddressForm>
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
          {/* {
            if(activeStep===steps.length){
              return(
                <Confirmation></Confirmation>
              )
            }
            else{
              return(
                <Form></Form>
              )
            }
          } */}
          {activeStep === steps.length ? <Confirmation></Confirmation> : checkoutToken && <Form></Form>}
        </Paper>
      </main>
    </>
  )
}

export default Checkout;
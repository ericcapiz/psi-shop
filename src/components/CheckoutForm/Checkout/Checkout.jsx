import {useState, useEffect} from 'react';
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core';
import {commerce} from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';

const steps = ['Shipping Address', 'Payment Details'];

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();

    //checkout token generate function - when user enters checkout component, token is generated
    useEffect(()=>{
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                setCheckoutToken(token);
            } catch (error) {
                
            }
        }
        generateToken();
    },[cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const Confirmation = () => (
        <div>Confirmation</div>
    )

    const Form = () => activeStep === 0 ? <AddressForm next={next}  checkoutToken={checkoutToken} /> : <PaymentForm nextStep={nextStep} backStep={backStep} checkoutToken={checkoutToken} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />

    return (
        <>
           <div className={classes.toolbar} />
           <main className={classes.layout}>
               <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
               </Paper>

           </main>
        </>
    )
}

export default Checkout

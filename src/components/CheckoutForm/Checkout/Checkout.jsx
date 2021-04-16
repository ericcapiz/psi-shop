import {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@material-ui/core';
import {commerce} from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';

const steps = ['Shipping Address', 'Payment Details'];

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setisFinished] = useState(false);
    const classes = useStyles();
    const history = useHistory();

    //checkout token generate function - when user enters checkout component, token is generated
    useEffect(()=>{
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                setCheckoutToken(token);
            } catch (error) {
                history.push('/');
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

    const timeout = () =>{
        setTimeout(() => {
            setisFinished(true)
        },3000);
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank-You For Your Purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order Ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button variant="outlined" component={Link} to="/" type="button">Shop Again</Button>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant="h5">Thank-You For Your Purchase!</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order Ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button variant="outlined" component={Link} to="/" type="button">Shop Again</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );

    if(error) {
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button variant="outlined" component={Link} to="/" type="button">Back to Home</Button>
        </>
    }

    const Form = () => activeStep === 0 ? <AddressForm next={next}  checkoutToken={checkoutToken} /> : 
    <PaymentForm nextStep={nextStep} timeout={timeout} backStep={backStep} checkoutToken={checkoutToken} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />

    return (
        <>
        <CssBaseline />
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

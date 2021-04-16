import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useForm, FormProvider} from 'react-hook-form';
import {commerce} from '../../lib/commerce';
import FormInput from './FormInput'
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core';

const AddressForm = ({checkoutToken, next}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    // console.log(checkoutToken);
    const methods = useForm();

    //changes the object of countries into an array and mapping 
    //thru the array to get the id : country abr and the label: country name and storing it in a new array called countries.
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}));
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name}));
    //shippingOptions is already listed as arry by default, didnt need Object.entries
    //sO = shippingOptions
    const options = shippingOptions.map((sO) => ({id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}));

    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        console.log('countries', countries);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const fetchSubdivisions = async (countryCode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);

    }

    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region: stateProvince});
        setShippingOptions(options);
        console.log('fetch', options)
        setShippingOption(options[0].id);
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    },[])

    useEffect(() => {
      if(shippingCountry) fetchSubdivisions(shippingCountry);
    },[shippingCountry])

    useEffect(() => {
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
      },[shippingSubdivision])


    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
                    <Grid container spacing={3}>
                        <FormInput name='firstName' label='First Name'/>
                        <FormInput name='lastName' label='Last Name'/>
                        <FormInput name='email' label='Email'/>
                        <FormInput name='address1' label='Address'/>
                        <FormInput name='city' label='City' />
                        <FormInput name='zip' label='Zip / Postal Code'/>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                               {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                               ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision) => (
                                        <MenuItem key={subdivision.id} value={subdivision.id}>
                                            {subdivision.label}
                                        </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                               {options.map((option) =>(
                                <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                               ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{display: 'flex', justifyContent:'space-between'}}>
                        <Button component={Link} to="/cart" variant="outlined" style={{backgroundColor: 'lightblue'}} color='primary'>Back To Cart</Button>
                        <Button type="submit" variant="contained" style={{backgroundColor: 'steelblue'}}>Next</Button>

                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm

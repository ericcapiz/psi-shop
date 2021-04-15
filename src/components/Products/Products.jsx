import React from 'react';
import Product from './Product/Product';
import {Grid} from '@material-ui/core';
import useStyles from './styles';

const products = [
    {id: 1, name: 'Shoes', price: "$5", description: 'Running Shoes', image:"https://cdn.mec.ca/medias/sys_master/high-res/high-res/9058101493790/5060876-GSP05.jpg"},
    {id: 2, name: 'Computer', price: "$15", description: 'Apple Macbook', image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.apple.com%2Fshop%2Fbuy-mac%2Fmacbook-pro%2F13-inch&psig=AOvVaw2hdktlfbZBA6Hv_UkiXSRM&ust=1618597255960000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMiUjPLugPACFQAAAAAdAAAAABAE"}
]

const Products = () => {
    const classes= useStyles();
    
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
            
        </main>
    )
}

export default Products

import React from 'react';
import {Card, CardMedia, CardContent, CardActions, Typogrophy, IconButton} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';
import useStyles from './styles';

const Product = ({product}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image='' title={product.nam} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typogrophy variant="h5" gutterBottom>
                        {product.name}
                    </Typogrophy>
                    <Typogrophy variant="h5">
                        {product.name}
                    </Typogrophy>
                </div>
                <Typogrophy variant="h2" color="textSecondary">
                    {product.description}
                </Typogrophy>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart">
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product

import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {AppBar, Toolbar, IconButton, Badge, Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import logo from '../../assets/psi.png';
import useStyles from './styles';



const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <>
          <AppBar position="fixed" className={classes.appBar} color="inherit">
              <Toolbar>
                  <Typography  component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                      <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
                      Psi-Shop
                  </Typography>
                  <div className={classes.grow} />
                  
                  {/* if path is the cart then do not show cart icon in nav */}
                  
                  {location.pathname === '/' && (
                    <div className={classes.button}>
                        <IconButton component={Link} to="/cart" color="inherit" aria-label="Show Cart Items">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart className={classes.shop}/>
                            </Badge>
                        </IconButton>
                    </div>
                  )}
              </Toolbar>
          </AppBar>  
        </>
    )
}

export default Navbar

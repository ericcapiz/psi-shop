import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    maxWidth: '100%',
    minHeight:'auto',
    borderRadius:'10%',
    paddingTop:'3%',
    backgroundColor:'steelblue',
    webkitBoxShadow: '5px 5px 5px 0px #000000, inset 4px 4px 15px 0px #000000, 33px -2px 17px 5px rgba(0,0,0,0)',
    boxShadow: '5px 5px 5px 0px #000000, inset 4px 4px 15px 0px #000000, 33px -2px 17px 5px rgba(0,0,0,0)',
},
  media: {
    height: 260,
    backgroundSize:'contain',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',

  },
  cartActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}));
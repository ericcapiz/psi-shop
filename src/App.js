import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {commerce} from './lib/commerce';
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Checkout from './components/CheckoutForm/Checkout/Checkout';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  
  const fetchProducts = async () => {
    const {data} = await commerce.products.list();
    setProducts(data);
  }
  
  const fetchCart = async() =>{
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async(productId, quantity) => {
    const {cart} = await commerce.cart.add(productId, quantity);
    setCart(cart)
  }

  const handleUpdateCartQty = async(productId, quantity) => {
    const {cart} = await commerce.cart.update(productId, {quantity});
    setCart(cart)
  }

  const handleRemoveFromCart = async(productId) => {
    const {cart} = await commerce.cart.remove(productId);
    setCart(cart)
  }

  const handleEmptyCart = async() => {
    const {cart} = await commerce.cart.empty();
    setCart(cart);
  }

  useEffect(()=>{
    fetchProducts();
    fetchCart();
  },[]);
 

  return (
    <Router>
      <div style={{backgroundColor: '#7e8d9b', height: '100vh'}}>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products onAddToCart={handleAddToCart} products={products} />
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart} handleEmptyCart={handleEmptyCart} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} />
          </Route>
          <Route exact path="/checkout">
            <Checkout cart={cart} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

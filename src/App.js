import {useState, useEffect} from 'react';
import './App.css';
import {commerce} from './lib/commerce';
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const {data} = await commerce.products.list();
    setProducts(data);
  }

  useEffect(()=>{
    fetchProducts();
  },[]);

  return (
    <div className="app">
      <Navbar />
     <Products products={products} />
    </div>
  );
}

export default App;

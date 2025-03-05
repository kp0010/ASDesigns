import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';


import { Footer } from './Components/Footer/Footer'
import { Navbar } from './Components/Navbar/Navbar'
import { HomePage } from "./Pages/HomePage";
import { Shop } from "./Pages/Shop";
import { Product } from "./Pages/Product";
import { Cart } from "./Pages/Cart";
import { Wishlist } from "./Pages/Wishlist";

import { Toaster } from "sonner";
import { Checkout } from "./Pages/Checkout";


function App() {
  return (
    <>
      <div>
        <Router>
          <Toaster theme='dark' />
          <Navbar />
          <RoutesList />
          <Footer />
        </Router>
      </div>
    </>
  )
}

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop/page?/:pageNo?" element={<Shop />} />
      <Route path="/product" element={<Product />} >
        <Route path=":productId" element={<Product />} />
      </Route>
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  )
}

export default App

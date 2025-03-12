import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';

import { Toaster } from "sonner";

import { Footer } from './Components/Footer/Footer'
import { Navbar } from './Components/Navbar/Navbar'
import { HomePage } from "./Pages/HomePage";
import { Shop } from "./Pages/Shop";
import { Product } from "./Pages/Product";
import { Cart } from "./Pages/Cart";
import { Wishlist } from "./Pages/Wishlist";
import { Checkout } from "./Pages/Checkout";
import { SuccessPayment } from "./Components/SuccessPayment/SuccessPayment";
import { RazorpayIntegration } from "./Pages/RazorpayIntegration";


function App() {
  return (
    <>
      <Router>
        <Toaster theme='dark' />
        <Navbar />
        <RoutesList />
        <Footer />
      </Router>
    </>
  )
}

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop/:category?" element={<Shop />} >
        <Route path="page?/:pageNo?" element={<Shop />} />
      </Route>
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/razorpayTrial" element={<RazorpayIntegration />} />
      <Route path="/success" element={<SuccessPayment />} />
    </Routes>
  )
}

export default App

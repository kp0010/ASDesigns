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


function App() {
  return (
    <>
      <div>
        <Navbar />
        <Router>
          <RoutesList />
        </Router>
        <Footer />
      </div>
    </>
  )
}

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product" element={<Product />} >
        <Route path=":productId" element={<Product />} />
      </Route>
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
  )
}

export default App

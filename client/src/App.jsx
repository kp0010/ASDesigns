import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import { Toaster } from "sonner";

import { Footer } from "./Components/Footer/Footer";
import { Navbar } from "./Components/Navbar/Navbar";
import { HomePage } from "./Pages/HomePage";
import { Shop } from "./Pages/Shop";
import { Product } from "./Pages/Product";
import { Cart } from "./Pages/Cart";
import { Wishlist } from "./Pages/Wishlist";
import { Checkout } from "./Pages/Checkout";
import { OrderInfo } from "./Components/OrderInfo/OrderInfo";
import { RazorpayIntegration } from "./Pages/RazorpayIntegration";
import { AdminRoutes } from "./Routes/AdminRoutes";
import { AdminLayout } from "./Components/Admin/AdminLayout/AdminLayout";
import { UserPreviousOrders } from "./Pages/UserPreviousOrders";


const UserLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <>
      <Toaster theme="dark" />
      <RoutesList />
    </>
  );
}

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop/:category?/page?/:pageNo?" element={<Shop />} />
        <Route path="product/:productId" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="razorpayTrial" element={<RazorpayIntegration />} />
        <Route path="order/:orderId" element={<OrderInfo />} />
        <Route path="previousOrders" element={<UserPreviousOrders />} />
      </Route>

      {/*  Admin Routes (No Navbar & Footer) */}
      <Route
        path="/admin/*"
        element={
          <AdminLayout />
        }
      >
        <Route path="*" element={<AdminRoutes />} />
      </Route>
    </Routes>
  );
};

export default App;

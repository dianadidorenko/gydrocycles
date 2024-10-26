import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Hydrocycles from "./pages/Hydrocycles";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Product from "./pages/Product";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";

function App() {
  return (
    <div>
      <ToastContainer />
      <Container>
        <Navbar />
      </Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hydrocycles" element={<Hydrocycles />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

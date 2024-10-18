import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Hydrocycles from "./pages/Hydrocycles";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Product from "./pages/Product";

function App() {
  return (
    <div>
      <Container>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hydrocycles" element={<Hydrocycles />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Container>

      <Footer />
    </div>
  );
}

export default App;

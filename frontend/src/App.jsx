import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Container from "./components/Container";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Container>
        <Navbar />
      </Container>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Hydrocycles from "./pages/Hydrocycles";

function App() {
  return (
    <div>
      <Container>
        <Navbar />
      </Container>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hydrocycles" element={<Hydrocycles />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

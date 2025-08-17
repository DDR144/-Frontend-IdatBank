import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Transferir from "./pages/Transferir";
import Confirmacion from "./pages/Confirmacion";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/transferir" element={<Transferir />} />
        <Route path="/confirmar" element={<Confirmacion />} />
      </Routes>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search";
import Pantry from "../pages/Pantry";
import Manage from "../pages/Manage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/pantry/:id" element={<Pantry />} />
        <Route path="/pantry/:id/manage" element={<Manage />} />
      </Routes>
    </Router>
  );
}

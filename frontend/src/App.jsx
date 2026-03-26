import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search";
import Pantry from "../pages/Pantry";
import Manage from "../pages/Manage";
import ManagerRegister from "../pages/ManagerRegister";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/manager" element={<ManagerRegister />} />
        <Route path="/search" element={<Search />} />
        <Route path="/pantry/:id" element={<Pantry />} />
        <Route path="/pantry/:id/manage" element={<Manage />} />
      </Routes>
    </Router>
  );
}

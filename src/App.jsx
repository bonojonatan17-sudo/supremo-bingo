import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Bingo from "./Pages/Bingo";
import Gewinne from "./Pages/Gewinne";
import Profil from "./Pages/Profil";
import Einstellungen from "./Pages/Einstellungen";
import Register from "./Pages/Register";
import Admin from "./Pages/Admin";
import AdminLogin from "./Pages/AdminLogin";

function App() {
  return (
    <Routes>
      {/* Hauptseiten */}
      <Route path="/" element={<Home />} />
      <Route path="/bingo" element={<Bingo />} />
      <Route path="/gewinne" element={<Gewinne />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/einstellungen" element={<Einstellungen />} />

      {/* Registrierung */}
      <Route path="/register" element={<Register />} />

      {/* Admin */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
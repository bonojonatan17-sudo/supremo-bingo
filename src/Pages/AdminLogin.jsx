import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminlogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login(e) {
    e.preventDefault();

    if (
      username.trim().toLowerCase() === "syncnico" &&
      password === "678932"
    ) {
      localStorage.setItem("admin", "true");
      navigate("/admin");
    } else {
      alert("❌ Falscher Benutzername oder Passwort!");
    }
  }

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={login}>

        <h1>👑 Supremo Admin</h1>

        <input
          type="text"
          placeholder="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Einloggen
        </button>

      </form>
    </div>
  );
}

export default AdminLogin;
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "🏠 Dashboard", path: "/" },
    { name: "🎲 Bingo", path: "/bingo" },
    { name: "🏆 Gewinne", path: "/gewinne" },
    { name: "👤 Profil", path: "/profil" },
    { name: "⚙️ Einstellungen", path: "/einstellungen" },
  ];

  return (
    <div
      style={{
        width: "260px",
        background: "#111827",
        minHeight: "100vh",
        padding: "30px",
        borderRight: "1px solid #2A3447",
      }}
    >
      <h1
        style={{
          color: "#A855F7",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        🎲 Supremo
      </h1>

      {menu.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              background:
                location.pathname === item.path ? "#7C3AED" : "#1F2937",
              color: "white",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "15px",
              fontWeight: "bold",
              transition: "0.3s",
            }}
          >
            {item.name}
          </div>
        </Link>
      ))}

      <div
        style={{
          marginTop: "50px",
          background: "#1A2235",
          padding: "20px",
          borderRadius: "15px",
          textAlign: "center",
        }}
      >
        <h3 style={{ color: "#A855F7" }}>💰 Jackpot</h3>
        <h2>250.000 $</h2>
      </div>
    </div>
  );
}

export default Sidebar;
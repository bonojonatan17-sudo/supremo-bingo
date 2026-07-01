import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function register() {
    if (!name.trim()) {
      alert("Bitte gib deinen RP-Namen ein.");
      return;
    }

    setLoading(true);

    try {
      // Prüfen ob Spieler bereits existiert
      const { data: existingPlayer, error: checkError } = await supabase
        .from("players")
        .select("*")
        .eq("name", name)
        .maybeSingle();

      if (checkError) {
        console.error(checkError);
      }

      if (existingPlayer) {
        alert("❌ Dieser Spieler existiert bereits.");
        setLoading(false);
        return;
      }

      // Spieler anlegen
      const { error } = await supabase.from("players").insert([
        {
          name: name,
          tickets: 0,
          balance: 0,
        },
      ]);

      if (error) {
        console.error(error);
        alert("Fehler: " + error.message);
        setLoading(false);
        return;
      }

      localStorage.setItem("playerName", name);

      alert("✅ Registrierung erfolgreich!");

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Ein unerwarteter Fehler ist aufgetreten.");
    }

    setLoading(false);
  }

  return (
    <div className="register-page">
      <div className="register-box">

        <h1>🎲 Supremo Bingo</h1>

        <p>Registriere deinen RP-Namen</p>

        <input
          type="text"
          placeholder="RP-Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={register} disabled={loading}>
          {loading ? "Registriere..." : "Registrieren"}
        </button>

      </div>
    </div>
  );
}

export default Register;
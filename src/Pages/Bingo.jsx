import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ScratchBoard from "../components/ScratchBoard";

function Bingo() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0B1020",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Header />

        <div style={{ padding: "30px" }}>
          <ScratchBoard />
        </div>
      </div>
    </div>
  );
}

export default Bingo;
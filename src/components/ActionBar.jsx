// src/components/ActionBar.jsx
import { Link } from "react-router-dom";

export default function ActionBar({ isLogged, onLogout }) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "22px",
        padding: "18px 12px",
        background: "var(--white)",
        borderBottom: "1px solid #eaeaea",
        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
      }}
    >
      {/* Inicio siempre visible */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "var(--text)",
          fontWeight: 700,
        }}
      >
        Inicio
      </Link>

      {isLogged && (
        <>
          <Link
            to="/dashboard"
            style={{
              textDecoration: "none",
              color: "var(--text)",
              fontWeight: 700,
            }}
          >
            Panel
          </Link>

          <button
            className="danger"
            onClick={onLogout}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontWeight: 600,
            }}
          >
            <span className="material-icons" style={{ fontSize: "18px" }}>
              logout
            </span>
            Salir
          </button>
        </>
      )}
    </div>
  );
}



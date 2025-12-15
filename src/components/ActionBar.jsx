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
        background: "white",
        borderBottom: "1px solid #eaeaea",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "var(--text)",
          fontWeight: 600,
        }}
      >
        Inicio
      </Link>

      {isLogged ? (
        <>
          <Link
            to="/dashboard"
            style={{
              textDecoration: "none",
              color: "var(--text)",
              fontWeight: 600,
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
            }}
          >
            <span className="material-icons" style={{ fontSize: "18px" }}>
              logout
            </span>
            Salir
          </button>
        </>
      ) : (
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "var(--primary-dark)",
            fontWeight: 700,
          }}
        >
          Ingresar
        </Link>
      )}
    </div>
  );
}


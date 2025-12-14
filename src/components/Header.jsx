import { Link } from "react-router-dom";

export default function Header({ isLogged }) {
  return (
    <header
      style={{
        width: "100vw",
        background: "var(--white)",
        borderBottom: "1px solid #e0e0e0",
        padding: "12px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}
    >
      <div
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: "var(--primary-dark)",
          letterSpacing: "0.5px"
        }}
      >
        BIC • Insumos
      </div>

      <nav style={{ display: "flex", gap: "20px" }}>
        <Link to="/">Inicio</Link>

        {isLogged ? (
          <>
            <Link to="/dashboard">Panel</Link>
            <Link to="/logout" style={{ color: "var(--danger)" }}>
              Salir
            </Link>
          </>
        ) : (
          <Link to="/login" style={{ color: "var(--primary-dark)" }}>
            Ingresar
          </Link>
        )}
      </nav>
    </header>
  );
}


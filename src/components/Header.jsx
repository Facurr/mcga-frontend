import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        backgroundColor: "white",
        borderBottom: "1px solid #e0e0e0",
        padding: "12px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo / Marca */}
      <div
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "var(--primary-dark)",
          letterSpacing: "0.5px",
        }}
      >
        BIC • Insumos
      </div>

      {/* Navegación */}
      <nav
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "var(--text)",
            fontWeight: 500,
          }}
        >
          Inicio
        </Link>

        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "var(--primary-dark)",
            fontWeight: 600,
          }}
        >
          Ingresar
        </Link>
      </nav>
    </header>
  );
}
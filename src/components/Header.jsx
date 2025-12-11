import { Link } from "react-router-dom";

export default function Header({ isLogged }) {
  return (
    <div style={{
      width: "100%",
      background: "var(--white)",
      borderBottom: "1px solid #e0e0e0",
      padding: "12px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 10
    }}>
      
      {/* Logo */}
      <div style={{
        fontSize: "22px",
        fontWeight: "700",
        color: "var(--primary-dark)",
        letterSpacing: "0.5px"
      }}>
        CIBIC • Insumos
      </div>

      {/* Menu */}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "var(--text)" }}>Inicio</Link>

        {isLogged ? (
          <>
            <Link to="/dashboard" style={{ textDecoration: "none", color: "var(--text)" }}>Panel</Link>
            <Link to="/logout" style={{ textDecoration: "none", color: "var(--danger)" }}>Salir</Link>
          </>
        ) : (
          <Link to="/login" style={{ textDecoration: "none", color: "var(--primary-dark)" }}>Ingresar</Link>
        )}
      </div>
    </div>
  );
}

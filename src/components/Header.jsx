// src/components/Header.jsx
export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        background: "white",
        borderBottom: "1px solid #e0e0e0",
        padding: "14px 30px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: "var(--primary-dark)",
          letterSpacing: "0.5px",
        }}
      >
        BIC • Insumos
      </div>
    </header>
  );
}



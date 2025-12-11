export default function Footer() {
  return (
    <div style={{
      textAlign: "center",
      padding: "20px",
      marginTop: "40px",
      color: "#607d8b",
      fontSize: "14px"
    }}>
      © {new Date().getFullYear()} • BIC Laboratorios — Sistema interno de control de insumos.
    </div>
  );
}

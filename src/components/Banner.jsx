// src/components/Banner.jsx
export default function Banner({ title, subtitle }) {
  return (
    <div
      style={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)", // fuerza ancho real
        background: "var(--primary)",
        color: "white",
        padding: "48px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "28px",
          fontWeight: 700,
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            marginTop: "8px",
            fontSize: "16px",
            opacity: 0.95,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

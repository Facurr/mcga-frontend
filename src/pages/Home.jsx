import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { getPublicProducts } from "../api/products";  // ✅ usar función de API centralizada

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getPublicProducts()
      .then((res) => setProducts(res.data))
      .catch(() => setErrorMsg("Ocurrió un error al cargar los insumos."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Banner superior */}
      <div
        style={{
          width: "100%",
          height: "180px",
          background: "var(--primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "26px",
          fontWeight: "600",
          letterSpacing: "1px",
          textShadow: "0 2px 4px rgba(0,0,0,0.15)",
        }}
      >
        Control de Insumos – BIC
      </div>

      <div className="container">
        <h2 style={{ marginTop: "0px", color: "var(--primary-dark)" }}>
          Sistema interno de gestión
        </h2>

        <p style={{ marginTop: "-5px", marginBottom: "25px", color: "#607d8b" }}>
          Consulta los insumos disponibles registrados en el sistema.
        </p>

        {errorMsg && <div className="error-box">{errorMsg}</div>}
        {loading && <Spinner />}

        {!loading && !errorMsg && (
          <>
            {products.length === 0 && <p>No hay insumos para mostrar.</p>}

            {products.map((p) => (
              <div key={p._id} className="product-item">
                <span className="product-text">
                  <strong>{p.name}</strong> – ${p.price}
                  <br />
                  {p.description}
                </span>
              </div>
            ))}
          </>
        )}

        <br />

        {/* Botón login */}
        <a
          href="/login"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span className="material-icons" style={{ fontSize: "20px" }}>
            login
          </span>
          Ingresar
        </a>
      </div>
    </>
  );
}

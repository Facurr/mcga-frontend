import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { getPublicProducts } from "../api/products";

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
      {/* ===== BANNER FULL WIDTH ===== */}
      <div className="banner">
        Control de Insumos – BIC
      </div>

      {/* ===== CONTENIDO ===== */}
      <div className="container" style={{ marginTop: "40px" }}>
        <h2 style={{ marginTop: 0 }}>Sistema interno de gestión</h2>

        <p style={{ color: "#607d8b", marginBottom: "25px" }}>
          Consulta los insumos disponibles registrados en el sistema.
        </p>

        {errorMsg && <div className="error-box">{errorMsg}</div>}
        {loading && <Spinner />}

        {!loading && !errorMsg && (
          <>
            {products.length === 0 && <p>No hay insumos para mostrar.</p>}

            {products.map((p) => (
              <div key={p._id} className="product-item">
                <span>
                  <strong>{p.name}</strong> – ${p.price}
                  <br />
                  {p.description}
                </span>
              </div>
            ))}
          </>
        )}

        {/* CTA LOGIN */}
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <a
            href="/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontWeight: 600,
              color: "var(--primary-dark)",
            }}
          >
            <span className="material-icons">login</span>
            Ingresar
          </a>
        </div>
      </div>
    </>
  );
}


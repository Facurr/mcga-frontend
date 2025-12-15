// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
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
      {/* Banner verde general unificado */}
      <Banner
        title="Control de Insumos – BIC"
        subtitle="Consulta pública de insumos disponibles"
      />

      {/* Contenido */}
      <div className="container" style={{ marginTop: "32px" }}>
        <h2 style={{ marginTop: 0 }}>Sistema interno de gestión</h2>

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

        {/* Acciones inferiores (Inicio + Ingresar juntos) */}
        <div
          style={{
            marginTop: "28px",
            display: "flex",
            justifyContent: "center",
            gap: "18px",
          }}
        >
          <Link to="/" style={{ fontWeight: 700, color: "var(--text)" }}>
            Inicio
          </Link>

          <Link
            to="/login"
            style={{
              fontWeight: 800,
              color: "var(--primary-dark)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span className="material-icons" style={{ fontSize: "20px" }}>
              login
            </span>
            Ingresar
          </Link>
        </div>
      </div>
    </>
  );
}



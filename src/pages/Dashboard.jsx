// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import ActionBar from "../components/ActionBar";

export default function Dashboard() {
  const { token, logout } = useAuth();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    inStock: true,
  });

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await api.get("/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch {
      setErrorMsg("No se pudieron cargar los insumos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreate = async () => {
    if (!form.name || !form.description || !form.price) {
      setErrorMsg("Todos los campos son obligatorios.");
      return;
    }

    try {
      await api.post("/products", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setForm({ name: "", description: "", price: "", inStock: true });
      setSuccessMsg("Insumo creado correctamente.");
      loadProducts();

      setTimeout(() => setSuccessMsg(""), 2000);
    } catch {
      setErrorMsg("Error al crear el insumo.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMsg("Insumo eliminado.");
      loadProducts();

      setTimeout(() => setSuccessMsg(""), 2000);
    } catch {
      setErrorMsg("Error al eliminar el insumo.");
    }
  };

  return (
    <>
      {/* BANNER PRINCIPAL (AHORA ES EL HEADER REAL) */}
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
        }}
      >
        Panel de Insumos – BIC
      </div>

      {/* ACTION BAR */}
      <ActionBar isLogged={true} onLogout={logout} />

      {/* CONTENIDO */}
      <div className="container">
        {errorMsg && <div className="error-box">{errorMsg}</div>}

        {successMsg && (
          <div
            style={{
              background: "#e8f8f5",
              color: "#239c90",
              padding: "12px",
              borderLeft: "4px solid var(--primary-dark)",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            {successMsg}
          </div>
        )}

        <h2>Registrar insumo</h2>

        <div style={{ marginBottom: "20px" }}>
          <input
            placeholder="Nombre del insumo"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Descripción"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Precio"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <button onClick={handleCreate} style={{ marginTop: "10px" }}>
            Crear
          </button>
        </div>

        {loading && <Spinner />}

        {!loading && (
          <>
            <h2>Insumos registrados</h2>

            {products.map((p) => (
              <div key={p._id} className="product-item">
                <span className="product-text">
                  <strong>{p.name}</strong> – ${p.price}
                  <br />
                  {p.description}
                </span>

                <button
                  className="danger"
                  onClick={() => handleDelete(p._id)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
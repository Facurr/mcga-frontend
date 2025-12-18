// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import ActionBar from "../components/ActionBar";
import Banner from "../components/Banner";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setErrorMsg("");

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
      {/* Banner verde general */}
      <Banner title="BIC • INSUMOS" subtitle="PANEL DE CONTROL" />

      {/* Action bar */}
      <ActionBar isLogged onLogout={logout} />

      <div className="container container--spaced">
        {errorMsg && <div className="error-box">{errorMsg}</div>}

        {successMsg && (
          <div
            style={{
              background: "#e8f8f5",
              color: "var(--primary-dark)",
              padding: "12px 16px",
              borderLeft: "4px solid var(--primary-dark)",
              borderRadius: "8px",
              marginBottom: "18px",
            }}
          >
            {successMsg}
          </div>
        )}

        <h2>Registrar insumo</h2>

        {/* Form controlado por JS (sin validación HTML) */}
        <form noValidate onSubmit={handleCreate} style={{ marginBottom: "24px" }}>
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

          <button type="submit" style={{ marginTop: "12px" }}>
            Crear
          </button>
        </form>

        {loading && <Spinner />}

        {!loading && (
          <>
            <h2>Insumos registrados</h2>

            {products.length === 0 && <p>No hay insumos cargados.</p>}

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
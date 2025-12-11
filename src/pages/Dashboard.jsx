import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner";

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
    } catch (error) {
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
      {/* Banner superior BIC */}
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
        Panel de Insumos – BIC
      </div>

      <div className="container">
        {/* Botón logout con icono */}
        <button
          onClick={logout}
          className="danger"
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span className="material-icons" style={{ fontSize: "18px" }}>
            logout
          </span>
          Cerrar sesión
        </button>

        {/* Mensajes */}
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
              animation: "fadeInUp 0.4s ease both",
            }}
          >
            {successMsg}
          </div>
        )}

        {/* Registrar insumo */}
        <h2 style={{ color: "var(--primary-dark)" }}>Registrar insumo</h2>

        <div style={{ marginBottom: "20px" }}>
          <input
            placeholder="Nombre del insumo"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Descripción"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
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

        {/* Loading */}
        {loading && <Spinner />}

        {/* Listado */}
        {!loading && (
          <>
            <h2 style={{ color: "var(--primary-dark)" }}>
              Insumos registrados
            </h2>

            {products.length === 0 && <p>No hay insumos cargados.</p>}

            {products.map((p) => (
              <div key={p._id} className="product-item">
                <span className="product-text">
                  <strong>{p.name}</strong> – ${p.price}

                  {/* BADGE STOCK */}
                  <span
                    style={{
                      background: p.inStock
                        ? "var(--primary)"
                        : "var(--danger)",
                      color: "white",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      marginLeft: "10px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span
                      className="material-icons"
                      style={{ fontSize: "14px" }}
                    >
                      {p.inStock ? "check_circle" : "error"}
                    </span>

                    {p.inStock ? "En stock" : "Sin stock"}
                  </span>

                  <br />
                  {p.description}
                </span>

                {/* Botón eliminar */}
                <button
                  className="danger"
                  onClick={() => handleDelete(p._id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span
                    className="material-icons"
                    style={{ fontSize: "18px" }}
                  >
                    delete
                  </span>
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

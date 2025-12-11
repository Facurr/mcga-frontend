import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    inStock: true,
  });

  const loadProducts = async () => {
    const res = await api.get("/products", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreate = async () => {
    await api.post("/products", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setForm({ name: "", description: "", price: "", inStock: true });
    loadProducts();
  };

  const handleDelete = async (id) => {
    await api.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadProducts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <button onClick={logout}>Cerrar sesión</button>

      <h2>Crear producto</h2>
      <input
        placeholder="Nombre"
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
      <button onClick={handleCreate}>Crear</button>

      <h2>Productos</h2>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} – ${p.price}
            <button onClick={() => handleDelete(p._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

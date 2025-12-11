import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products/public")
      .then((res) => setProducts(res.data))
      .catch(() => console.log("Error al cargar productos"));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Productos disponibles</h1>

      {products.length === 0 && <p>No hay productos para mostrar.</p>}

      <ul>
        {products.map((p) => (
          <li key={p._id}>
            <strong>{p.name}</strong> – ${p.price}
            <br />
            {p.description}
          </li>
        ))}
      </ul>

      <a href="/login">Ir al Login</a>
    </div>
  );
}

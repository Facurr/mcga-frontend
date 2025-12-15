// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useAuth } from "../hooks/useAuth";
import Banner from "../components/Banner";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      navigate("/dashboard");
    } catch {
      setErrorMsg("Credenciales incorrectas o error de servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Banner verde general unificado */}
      <Banner
        title="Control de Insumos – BIC"
        subtitle="Acceso al sistema"
      />

      {/* Login centrado real */}
      <div
        style={{
          minHeight: "calc(100vh - 260px)", // banner + footer
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "420px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "22px" }}>
            Ingreso al sistema
          </h2>

          {errorMsg && <div className="error-box">{errorMsg}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "14px" }}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@bic.com"
                autoComplete="username"
                required
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                style={{ width: "100%" }}
              />
            </div>

            <button
              type="submit"
              style={{ width: "100%" }}
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}



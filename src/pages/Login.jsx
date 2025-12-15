import { useForm } from "react-hook-form";
import { api } from "../api/api";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      login(res.data.token);
      window.location.href = "/dashboard";
    } catch {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 240px)", // header + footer
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="container" style={{ maxWidth: "420px" }}>
        <h2 style={{ textAlign: "center" }}>Ingreso al sistema</h2>

        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "25px" }}>
          <div style={{ marginBottom: "15px" }}>
            <label>Email</label>
            <input
              type="email"
              {...register("email")}
              required
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Contraseña</label>
            <input
              type="password"
              {...register("password")}
              required
              style={{ width: "100%" }}
            />
          </div>

          <button style={{ width: "100%" }} type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}



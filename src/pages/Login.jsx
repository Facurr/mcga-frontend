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
    } catch (error) {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "20px" }}>
        
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <br />
          <input
            type="email"
            {...register("email")}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Contraseña:</label>
          <br />
          <input
            type="password"
            {...register("password")}
            required
          />
        </div>

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}


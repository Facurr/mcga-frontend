import { useForm } from "react-hook-form";
import { api } from "../api/api";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      login(res.data.token); // guardamos token
      window.location.href = "/dashboard";
    } catch (error) {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input type="email" {...register("email")} required />
        </div>

        <div>
          <label>Contraseña:</label>
          <input type="password" {...register("password")} required />
        </div>

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

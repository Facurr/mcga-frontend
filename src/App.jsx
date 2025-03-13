import { useState } from "react";
import { loginUser } from "./services/api";

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await loginUser({ email, password });

        if (result) {
            setMessage(`Bienvenido ${result.name}`);
            localStorage.setItem("token", result.token); // Guardar token en localStorage
        } else {
            setMessage("Error en login");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Ingresar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default App;



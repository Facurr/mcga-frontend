const API_URL = "http://localhost:5000/api";

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!response.ok) throw new Error("Error en el registro");

        return await response.json();
    } catch (error) {
        console.error("Error en registerUser:", error);
        return null;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) throw new Error("Credenciales incorrectas");

        return await response.json();
    } catch (error) {
        console.error("Error en loginUser:", error);
        return null;
    }
};


import { api } from "./api";

// Obtener productos públicos (sin login)
export const getPublicProducts = () => {
  return api.get("/products/public");
};

// Crear producto (requiere token)
export const createProduct = (product, token) => {
  return api.post("/products", product, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Obtener productos privados (requiere token)
export const getPrivateProducts = (token) => {
  return api.get("/products", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const useAuth = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  const login = (token) => {
    localStorage.setItem("token", token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return { token, isAuthenticated, login, logout };
};

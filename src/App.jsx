import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { useAuth } from "./hooks/useAuth";

function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      {/* Header full width */}
      <Header isLogged={!!token} />

      {/* Contenido de páginas */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>

      {/* Footer full width */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;

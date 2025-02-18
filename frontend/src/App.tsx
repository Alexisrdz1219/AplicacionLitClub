import { AuthProvider } from "./context/AuthContext";
import { AppRouter } from "./routes/AppRouter";
import { Navbar } from "./components/Navbar";
import { useLocation } from "react-router-dom";

export const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/login", "/register"]; // ✅ Oculta el Navbar solo en Home
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      {!hideNavbar && <Navbar />}
      <AppRouter />
    </AuthProvider>
  );
};


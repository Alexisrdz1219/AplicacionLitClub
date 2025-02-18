import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";
import { Users } from "../pages/Users";
import { AdminDashboard } from "../pages/AdminDashboard";
import { Books } from "../pages/Books";
import { Catalog } from "../pages/Catalog";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { MyBooks } from "../pages/MyBooks";
import Home from "../pages/SitioWeb";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute roleRequired="administrador"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute roleRequired="administrador"><Users /></ProtectedRoute>} />
      <Route path="/books" element={<ProtectedRoute roleRequired="administrador"><Books /></ProtectedRoute>} />
      <Route path="/catalog" element={<Catalog />} /> {/* ✅ Abierto para todos */}
      <Route path="/my-books" element={<ProtectedRoute><MyBooks /></ProtectedRoute>} />
    </Routes>
  );
};

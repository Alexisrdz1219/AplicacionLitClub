import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {
  const auth = useContext(AuthContext);

  if (!auth?.user || auth.user.rol !== "administrador") {
    return <h2 style={styles.accessDenied}>Acceso denegado</h2>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Panel de Administración</h1>
      <p style={styles.text}>Bienvenido, {auth.user.nombre} ({auth.user.email})</p>
      <p style={styles.text}>Rol: {auth.user.rol}</p>

      <div style={styles.buttons}>
        <Link to="/users" style={styles.button}>Gestionar Usuarios</Link>
        <Link to="/books" style={styles.button}>Gestionar Libros</Link>
        <Link to="/catalog" style={styles.button}>Ver Catálogo</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    padding: "30px",
    // eslint-disable-next-line @typescript-eslint/prefer-as-const
    textAlign: "center" as "center",
    background: "linear-gradient(135deg, #f4f4f4, #e0e0e0)",
    borderRadius: "10px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    animation: "fadeIn 0.8s ease-in-out"
  },
  title: {
    fontSize: "32px",
    color: "#222",
    marginBottom: "15px",
    animation: "slideIn 1s ease-in-out"
  },
  text: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "20px",
    animation: "fadeIn 1.2s ease-in-out"
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  
    marginTop: "25px"
  },
  button: {
    display: "inline-block",
    padding: "14px 22px",
    background: "red",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    transition: "background 0.3s, transform 0.2s",
    animation: "scaleUp 0.5s ease-in-out"
  },
  accessDenied: {
    // eslint-disable-next-line @typescript-eslint/prefer-as-const
    textAlign: "center" as "center",
    color: "red",
    fontSize: "24px",
    marginTop: "20px"
  }
};
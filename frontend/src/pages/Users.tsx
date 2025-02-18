import { useState, useEffect, useContext } from "react";
import { getAllUsers, changeUserRole } from "../api/users";
import { AuthContext } from "../context/AuthContext";

interface User {
  id: number;
  nombre: string;
  email: string;
  rol: "administrador" | "usuario";
}

export const Users = () => {
  const auth = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      if (auth?.token) {
        try {
          const usersList = await getAllUsers(auth.token);
          setUsers(usersList);
        } catch (error) {
          console.error("Error al obtener usuarios:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUsers();
  }, [auth?.token]);

  const handleRoleChange = async (id: number, newRole: "administrador" | "usuario") => {
    if (!auth?.token) return;

    try {
      await changeUserRole(id, newRole, auth.token);
      setUsers(users.map(user => (user.id === id ? { ...user, rol: newRole } : user)));
    } catch (error) {
      console.error("Error al cambiar rol", error);
    }
  };

  if (loading) return <h2 style={styles.loading}>Cargando usuarios...</h2>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestión de Usuarios</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
              <td>
                {user.rol !== "administrador" ? (
                  <button style={styles.button} onClick={() => handleRoleChange(user.id, "administrador")}>
                    Hacer Administrador
                  </button>
                ) : (
                  <button style={styles.button} onClick={() => handleRoleChange(user.id, "usuario")}>
                    Quitar Administrador
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles: { 
  container: React.CSSProperties;
  title: React.CSSProperties;
  table: React.CSSProperties;
  button: React.CSSProperties;
  loading: React.CSSProperties;
} = {
  container: {
    textAlign: "center",
    padding: "20px",
    animation: "fadeIn 0.8s ease-in-out"
  },
  title: {
    fontSize: "28px",
    color: "#a693c9",
    marginBottom: "15px",
    animation: "slideIn 1s ease-in-out"
  },
  table: {
    width: "80%",
    margin: "20px auto",
    borderCollapse: "collapse",
    animation: "fadeIn 1.2s ease-in-out",
    color: "#a693c9"
  },
  button: {
    padding: "5px 10px",
    margin: "5px",
    cursor: "pointer",
    background: "#333",
    color: "white",
    borderRadius: "5px",
    transition: "background 0.3s, transform 0.2s",
    animation: "scaleUp 0.5s ease-in-out"
  },
  loading: {
    textAlign: "center",
    color: "#ff6600",
    fontSize: "20px",
    animation: "pulse 1s infinite"
  }
};

// Animaciones en CSS
document.head.insertAdjacentHTML("beforeend", `
  <style>
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideIn {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @keyframes scaleUp {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    @keyframes pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }
  </style>
`);

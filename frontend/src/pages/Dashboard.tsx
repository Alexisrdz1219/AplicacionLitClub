import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/home.css"; // ✅ Importar el CSS mejorado
import { HorrorWarning } from "../components/HorrorWarning";

const categories = [
  {
    title: "Tendencia Mundial 🌎",
    className: "trending-books",
    books: [
      { title: "Alas de ónix", author: "Rebecca Yarros", image: "https://tse3.mm.bing.net/th?id=OIP.5S9raLaPleKZBCeKoOBJ6wHaLR&pid=Api" },
      { title: "La asistenta", author: "Freida McFadden", image: "https://tse4.mm.bing.net/th?id=OIP.FTz-GDGfMCodf7ch7EIFwwAAAA&pid=Api" },
      { title: "Redes (Invisible 2)", author: "Eloy Moreno", image: "https://tse1.mm.bing.net/th?id=OIP.iFluRflPFuvHOIo_dHt5wwAAAA&pid=Api" },
      { title: "Hábitos atómicos", author: "James Clear", image: "https://tse3.mm.bing.net/th?id=OIP.o1qTshydQ5_wv2XAVyFWxAHaLd&pid=Api" },
      { title: "Victoria", author: "Paloma Sánchez-Garnica", image: "https://tse2.mm.bing.net/th?id=OIF.IzLMvcqz3UN5ydNCQ3QE%2bQ&pid=Api" }
    ]
  },
  {
    title: "Mejores Calificados ⭐️",
    className: "best-rated-books",
    books: [
         { title: "Victorian Psycho", author: "Virginia Feito", image: "https://tse4.mm.bing.net/th?id=OIP.el1e5fpFzQOKgJ8Y7F0hbgHaLM&w=200&h=302&c=7" },
   { title: "Animales difíciles", author: "Rosa Montero", image: "https://tse1.mm.bing.net/th?id=OIP.SVYz66_9-zAzRlibMVFW8QAAAA&w=200&h=341&c=7" },
{ title: "Sueños de bronce", author: "Camilla Läckberg", image: "https://tse3.mm.bing.net/th?id=OIP.NowYvDTUPe2AsoZKJizCtwAAAA&w=120&h=302&c=7" },
  { title: "Mi año romano", author: "André Aciman", image: "https://tse2.mm.bing.net/th?id=OIP.9snZdx6naXBhe9L16iStPwAAAA&w=120&h=315&c=7" },
 { title: "El plan maestro", author: "Javier Sierra", image: "https://tse4.mm.bing.net/th?id=OIP.4k-Gb9-fMhvb-m4GcjO2QgAAAA&w=200&h=200&c=7" }
    ]
  },
  {
    title: "La Magia de los Libros 🪄",
    className: "magical-books",
    books: [
         { title: "Harry Potter y la piedra filosofal", author: "J.K. Rowling", image: "https://image.cdn0.buscalibre.com/5b56b6968863b5e8148b4568.__RS360x360__.jpg" },
   { title: "Alas de hierro", author: "Rebecca Yarros", image: "https://tse2.mm.bing.net/th?id=OIP.-Y9DzSE1RnWSxMI8VdZ7sgAAAA&w=200&h=308&c=7" },
   { title: "Rosie Frost y la Reina Halcón", author: "Geri Halliwell-Horner", image: "https://tse4.mm.bing.net/th?id=OIP.ivNk6eIzAreKT1_g-hb4sAHaHa&w=200&h=200&c=7" },
   { title: "El fuego: misterio y magia", author: "Álvaro Martín", image: "https://tse1.mm.bing.net/th?id=OIP.N9EZiXblZOU80i_JX1nNEAAAAA&w=200&h=310&c=7" },
   { title: "Sonó un violín en París", author: "María Reig", image: "https://tse4.mm.bing.net/th?id=OIP.N9MB9jAUyYKey6ZF94rxsgAAAA&w=143&h=306&c=7" }
    ]
  },
  {
    title: "Terror 👹",
    className: "horror-books",
    books: [
      { title: "El resplandor", author: "Stephen King", image: "https://tse4.mm.bing.net/th?id=OIP.hzdhXsaBrhtu_cWcOgfMvgHaLQ&w=200&h=304&c=7" },
   { title: "Drácula", author: "Bram Stoker", image: "https://tse1.mm.bing.net/th?id=OIP.GQPcCYXCcGLzqLMG7ZYo3AHaKT&w=200&h=278&c=7" },
   { title: "Frankenstein", author: "Mary Shelley", image: "https://tse3.mm.bing.net/th?id=OIP.R4Tkd3c4rUq5DfwHCVTHnAHaKS&w=200&h=278&c=7" },
   { title: "El exorcista", author: "William Peter Blatty", image: "https://tse4.mm.bing.net/th?id=OIP.fYVp66UK-QACYTPfsLH4IAHaLK&w=200&h=301&c=7" },
   { title: "It", author: "Stephen King", image: "https://tse2.mm.bing.net/th?id=OIP.55hYoVk27fQVf1PewaY8qgHaLR&w=200&h=304&c=7" },
    ]
  },
  {
    title: "Mexicanos 🇲🇽",
    className: "mexican-books",
    books: [
      { title: "Pedro Páramo", author: "Juan Rulfo", image: "https://tse1.mm.bing.net/th?id=OIP.VM3GR_2kKCV0bgGBVotLywHaL3&w=200&h=320&c=7" },
   { title: "Los de abajo", author: "Mariano Azuela", image: "https://tse3.mm.bing.net/th?id=OIP.LEJYtimuAg8XyOl7Nu9tGQHaKp&w=200&h=287&c=7" },
   { title: "Como agua para chocolate", author: "Laura Esquivel", image: "https://tse2.mm.bing.net/th?id=OIP.IfJ4dKBANDlHa25VqTCeQQHaL6&w=200&h=322&c=7" },
   { title: "La muerte de Artemio Cruz", author: "Carlos Fuentes", image: "https://tse1.mm.bing.net/th?id=OIP.Mf4rJ5PlxTHqToSyTHHHwgHaL1&w=200&h=319&c=7" },
   { title: "El laberinto de la soledad", author: "Octavio Paz", image: "https://tse3.mm.bing.net/th?id=OIP.CpMpqT7ol1RmJL2zpOo6dAAAAA&w=200&h=301&c=7" },
    ]
  }
];

// import { useEffect } from "react";
// import { logEvent } from "../services/logService";

// export const Dashboard = () => {
//   useEffect(() => {
//     logEvent(1, "Usuario visitó el Dashboard", "INFO");
//   }, []);

//   return <h1>Bienvenido al Dashboard</h1>;
// };


export const Dashboard = () => {
  const auth = useContext(AuthContext);
  const [showWarning, setShowWarning] = useState(false);

  const playScarySound = () => {
    const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/6669");
    audio.play();
  };

  const handleMouseEnter = (categories: string) => {
    if (categories === "horror-books") {
      setShowWarning(true);
      playScarySound();
      setTimeout(() => {
        setShowWarning(false);
      }, 4000);
    }
  };

  if (!auth?.user) return <h2>Cargando...</h2>;

  return (
    <div className="dashboard-container">
      <h1>Bienvenido, {auth.user.nombre}</h1>
      <p>Email: {auth.user.email}</p>
      <p>Rol: {auth.user.rol}</p>

      <div className="dashboard-buttons">
        <Link to="/catalog" className="dashboard-button">Ver todos los libros</Link>
      </div>

      {categories.map((category, idx) => (
        <section
          key={idx}
          className={`book-category ${category.className || ""}`}
          style={{ marginBottom: "40px" }}
          onMouseEnter={() => handleMouseEnter(category.className)}
        >
          {showWarning && category.className === "horror-books" && <HorrorWarning />}
          <h2>{category.title}</h2>
          <div className="books-grid">
            {category.books.map((book, index) => (
              <div key={index} className="book-card">
                <img src={book.image} alt={book.title} className="book-image" />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

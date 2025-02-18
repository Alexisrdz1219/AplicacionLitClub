import { motion } from "framer-motion";
import { NavbarHome } from "../components/NavbarHome";
import "../styles/styles.css";
import logoLitClub from "../assets/home.png";
import { Typewriter } from "react-simple-typewriter";
import aboutImage from '../assets/sobrenosotros.png'; 

// Lista de funcionalidades
const appFeatures = [
  { title: "📖 Catálogo Extenso", description: "Explora miles de libros en diferentes géneros y categorías." },
  { title: "💼 Compra y Renta", description: "Compra o alquila libros digitales y físicos fácilmente." },
  { title: "🌎 Comunidad", description: "Comparte reseñas y comentarios con otros lectores." },
  { title: "🔍 Búsqueda Avanzada", description: "Filtra libros por género, autor y popularidad." },
  { title: "📊 Estadísticas de Lectura", description: "Lleva un seguimiento de tus hábitos de lectura." },
];

// Lista de libros recomendados
const recommendedBooks = [
  { title: "El Principito", author: "Antoine de Saint-Exupéry", cover: "https://m.media-amazon.com/images/I/81t2CVWEsUL._SL1500_.jpg" },
  { title: "1984", author: "George Orwell", cover: "https://m.media-amazon.com/images/I/71kxa1-0mfL._SL1360_.jpg" },
  { title: "Harry Potter y la Piedra Filosofal", author: "J.K. Rowling", cover: "https://m.media-amazon.com/images/I/81iqZ2HHD-L.jpg" },
  { title: "Cien Años de Soledad", author: "Gabriel García Márquez", cover: "https://m.media-amazon.com/images/I/81aHNOipV-L.jpg" },
  { title: "Orgullo y Prejuicio", author: "Jane Austen", cover: "https://m.media-amazon.com/images/I/81Uwbff-KDL.jpg" },
];

// Lista de comentarios de usuarios
const userComments = [
  { name: "Nestor Ruiz", comment: "¡LitClub es increíble! Encontré libros que nunca imaginé leer. 📖✨", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Alan Puente", comment: "Una plataforma muy intuitiva y fácil de usar. ¡Me encanta! 👏", avatar: "https://randomuser.me/api/portraits/men/35.jpg" },
  { name: "Edson Rodriguez", comment: "Poder alquilar y comprar libros en un solo lugar es genial. 🚀", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <NavbarHome />
      {/* Sección de Bienvenida */}
      <section className="presentation">
        <motion.div className="text-container" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
        <h1 className="title">
      <span className="text-purple">
        <Typewriter
          words={["Bienvenido a LitClub", "Conoce el Mundo", "Descubre historias únicas"]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={80}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </span>
    </h1>
    <p className="mt-4 text-lg max-w-lg subtitle text-center relative text-white italic">
      <span className="magic-text">
        Los libros son puertas mágicas a mundos infinitos, donde cada página es un hechizo que despierta la imaginación.
      </span>
    </p>

          <div className="buttons">
            <motion.a href="/explorar" className="button button-primary" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              Explorar Libros
            </motion.a>
            <motion.a href="/registro" className="button button-secondary" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              Únete Ahora
            </motion.a>
          </div>
        </motion.div>

        <motion.div className="logo-container" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
          <img src={logoLitClub} alt="LitClub Logo" className="logo" />
        </motion.div>
      </section>

      <section className="about-us">
      <div className="about-text">
        <h2 className="about-title">📖 Descubre un Nuevo Mundo de Lectura</h2>
        <p className="about-description">
          Sumérgete en un universo donde la lectura se vuelve interactiva, emocionante y accesible para todos. 
          Con <strong>LitClub</strong>, conecta con otros lectores, descubre nuevas historias y vive la magia de los libros como nunca antes.
        </p>
        <a href="/registro" className="about-cta">Conocer Mas</a>
      </div>
      <div className="about-image">
        <img src={aboutImage} alt="Personas disfrutando de la lectura" />
      </div>
    </section>


      {/* Sección de Funcionalidades */}
      <section className="app-features">
        <h2 className="features-title">⚡ Funcionalidades de LitClub</h2>
        <motion.div className="features-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          {appFeatures.map((feature, index) => (
            <motion.div key={index} className="feature-card" whileHover={{ scale: 1.05 }}>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Sección de Libros Recomendados */}
      <section className="book-preview">
        <h2 className="book-preview-title">📚 Libros que te pueden gustar</h2>
        <motion.div className="book-carousel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          {recommendedBooks.map((book, index) => (
            <motion.div key={index} className="book-card" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <img src={book.cover} alt={book.title} className="book-cover" />
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Sección de Comentarios de Usuarios */}
      <section className="user-comments">
        <h2 className="comments-title">💬 Opiniones de nuestros usuarios</h2>
        <motion.div className="comments-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          {userComments.map((user, index) => (
            <motion.div key={index} className="comment-card" whileHover={{ scale: 1.05 }}>
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <h3 className="user-name">{user.name}</h3>
              <p className="user-comment">"{user.comment}"</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

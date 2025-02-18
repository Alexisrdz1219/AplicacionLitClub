import { useContext, useEffect, useState } from "react";
import { getAllBooks } from "../api/books";
import { createTransaction } from "../api/transactions";
import { AuthContext } from "../context/AuthContext";
import { Book } from "../types/Book";
import { styled } from "@mui/material/styles";
import { Button, TextField, Container, Typography, Grid, Card, CardContent, CardActions } from "@mui/material";


const StyledContainer = styled(Container)({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
  textAlign: "center",
  background: "url('https://www.transparenttextures.com/patterns/wood-pattern.png')",
  backgroundColor: "#f4e3c1",
  borderRadius: "10px",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
});

const StyledGrid = styled(Grid)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  justifyContent: "center",
  padding: "20px",
});

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "#fff3e0",
  borderRadius: "10px",
  padding: "15px",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const StyledImage = styled("img")({
  width: "100%",
  height: "250px",
  objectFit: "cover",
  borderRadius: "5px",
});

export const Catalog = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const auth = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Estado para búsqueda
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data: Book[] = await getAllBooks();
      setBooks(data);
      setFilteredBooks(data);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const filtered = books.filter(book =>
      book.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.frase.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  const handleTransaction = async (libro_id: number, tipo: "compra" | "renta") => {
    if (!auth?.token || !auth.user) {
      alert("Debes iniciar sesión para comprar o rentar un libro.");
      return;
    }
  
    let dias_renta = undefined;
    if (tipo === "renta") {
      const dias = prompt("¿Cuántos días deseas rentar el libro?");
      if (!dias || isNaN(Number(dias)) || Number(dias) <= 0) {
        alert("Por favor, ingresa un número válido de días.");
        return;
      }
      dias_renta = Number(dias);
    }
  
    try {
      console.log("Enviando transacción:", { usuario_id: auth.user.id, libro_id, tipo, dias_renta });
      await createTransaction(auth.user.id, libro_id, tipo, dias_renta, auth.token);
      alert(`¡${tipo === "compra" ? "Compra" : "Renta"} exitosa!`);
    } catch (error) {
      console.error("Error en la transacción:", error);
      alert("No se pudo procesar la transacción. Inténtalo nuevamente.");
    }
  };
  
  
  
  


  return (
    // <div>
    //   <h1>Catálogo de Libros</h1>

    //   {/* ✅ Barra de búsqueda */}
    //   <input
    //     type="text"
    //     placeholder="Buscar por nombre, autor o frase..."
    //     value={searchTerm}
    //     onChange={(e) => setSearchTerm(e.target.value)}
    //   />

    //   <div>
    //     {filteredBooks.map((book) => (
    //       <div key={book.id}>
    //         <h2>{book.nombre}</h2>
    //         <p><strong>Frase:</strong> {book.frase}</p>
    //         <p>{book.descripcion}</p>
    //         <p><strong>Autor:</strong> {book.autor} | <strong>Páginas:</strong> {book.paginas}</p>
    //         <img src={book.imagen_url} alt={book.nombre} width="150" />
    //         <div>
    //           <button onClick={() => handleTransaction(book.id, "compra")} disabled={book.stock <= 0}>Comprar</button>
    //           <button onClick={() => handleTransaction(book.id, "renta")}>Pedir Prestado</button>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <StyledContainer>
      <Typography variant="h4" gutterBottom>Catálogo de Libros</Typography>
      <TextField fullWidth label="Buscar por nombre, autor o frase" variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <StyledGrid>
        {filteredBooks.map(book => (
          <StyledCard key={book.id}>
            <StyledImage src={book.imagen_url} alt={book.nombre} />
            <CardContent>
              <Typography variant="h6">{book.nombre}</Typography>
              <Typography variant="body2">{book.descripcion}</Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={() => handleTransaction(book.id, "compra")} disabled={book.stock <= 0}>Comprar</Button>
              <Button variant="contained" color="secondary" onClick={() => handleTransaction(book.id, "renta")}>Pedir Prestado</Button>
            </CardActions>
          </StyledCard>
        ))}
      </StyledGrid>
    </StyledContainer>
  );
};

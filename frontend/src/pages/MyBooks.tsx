// import { useEffect, useState, useContext, useCallback } from "react";
// import { getUserBooks, returnBook } from "../api/transactions";
// import { AuthContext } from "../context/AuthContext";
// import { UserBook } from "../types/UserBook";

// export const MyBooks = () => { 
//   const auth = useContext(AuthContext);
//   const [books, setBooks] = useState<UserBook[]>([]); // ✅ Tipo correcto

//   const fetchBooks = useCallback(async () => {
//     if (!auth?.user || !auth.token) return;
//     try {
//       const data = await getUserBooks(auth.user.id, auth.token);
//       setBooks(data);
//     } catch (error) {
//       console.error("Error al obtener libros del usuario", error);
//     }
//   }, [auth?.user, auth?.token]);

//   useEffect(() => {
//     fetchBooks();
//   }, [fetchBooks]);

//   const handleReturn = async (transaction_id: number) => {
//     if (!auth?.token) return;
//     try {
//       await returnBook(transaction_id, auth.token);
//       fetchBooks();
//     } catch (error) {
//       console.error("Error al devolver libro", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Mis Libros</h1>
//       {books.length === 0 ? (
//         <p>No tienes libros comprados o rentados.</p>
//       ) : (
//         <ul>
//           {books.map((book) => (
//             <li key={book.id}>
//               <h2>{book.nombre}</h2>
//               <p><strong>Autor:</strong> {book.autor}</p>
//               <img src={book.imagen_url} alt={book.nombre} width="100" />
//               <p><strong>Tipo:</strong> {book.tipo === "compra" ? "Comprado" : "Rentado"}</p>
//               {book.fecha_vencimiento && (
//                 <p><strong>Vence:</strong> {new Date(book.fecha_vencimiento).toLocaleDateString()}</p>
//               )}
//               {book.tipo === "renta" && (
//                 <button onClick={() => handleReturn(book.id)}>Devolver Libro</button>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
import { useEffect, useState, useContext, useCallback } from "react";
import { getUserBooks, returnBook } from "../api/transactions";
import { AuthContext } from "../context/AuthContext";
import { UserBook } from "../types/UserBook";
import { styled } from "@mui/material/styles";
import { Button, Container, Typography, Grid, Card, CardContent, CardActions } from "@mui/material";

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

  export const MyBooks = () => {
     const auth = useContext(AuthContext);
     const [books, setBooks] = useState<UserBook[]>([]); // ✅ Tipo correcto
  
     const fetchBooks = useCallback(async () => {
       if (!auth?.user || !auth.token) return;
       try {
         const data = await getUserBooks(auth.user.id, auth.token);
         setBooks(data);
       } catch (error) {
         console.error("Error al obtener libros del usuario", error);
       }
     }, [auth?.user, auth?.token]);
  
     useEffect(() => {
       fetchBooks();
     }, [fetchBooks]);
  
     const handleReturn = async (transaction_id: number) => {
       if (!auth?.token) return;
       try {
         await returnBook(transaction_id, auth.token);
         fetchBooks();
       } catch (error) {
         console.error("Error al devolver libro", error);
       }
     };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>Mis Libros</Typography>
      {books.length === 0 ? (
        <Typography variant="body1">No tienes libros comprados o rentados.</Typography>
      ) : (
        <StyledGrid>
          {books.map((book) => (
            <StyledCard key={book.id}>
              <StyledImage src={book.imagen_url} alt={book.nombre} />
              <CardContent>
                <Typography variant="h6">{book.nombre}</Typography>
                <Typography variant="body2"><strong>Autor:</strong> {book.autor}</Typography>
                <Typography variant="body2"><strong>Tipo:</strong> {book.tipo === "compra" ? "Comprado" : "Rentado"}</Typography>
                {book.fecha_vencimiento && (
                  <Typography variant="body2"><strong>Vence:</strong> {new Date(book.fecha_vencimiento).toLocaleDateString()}</Typography>
                )}
              </CardContent>
              {book.tipo === "renta" && (
                <CardActions>
                  <Button variant="contained" color="secondary" onClick={() => handleReturn(book.id)}>
                    Devolver Libro
                  </Button>
                </CardActions>
              )}
            </StyledCard>
          ))}
        </StyledGrid>
      )}
    </StyledContainer>
  );
};

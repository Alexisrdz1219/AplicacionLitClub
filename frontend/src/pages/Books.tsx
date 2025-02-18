import { useState, useEffect, useContext } from "react";
import { getAllBooks, addBook, deleteBook, updateBook } from "../api/books";
import { AuthContext } from "../context/AuthContext";
import { Book } from "../types/Book";
import { Button, TextField, Container, Typography, Grid, Card, CardContent, CardActions } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)({
  marginTop: "20px",
  textAlign: "center",
  color: "#a693c9"
});

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginBottom: "20px",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
});

const StyledCard = styled(Card)({
  maxWidth: "300px",
  margin: "10px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

export const Books = () => {
  const auth = useContext(AuthContext);
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newBook, setNewBook] = useState<Omit<Book, "id">>({
    nombre: "",
    frase: "",
    descripcion: "",
    autor: "",
    paginas: 0,
    imagen_url: "",
    stock: 1,
  });
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const data: Book[] = await getAllBooks();
    setBooks(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBook) {
      await updateBook(editingBook.id, editingBook, auth?.token || "");
      setEditingBook(null);
    } else {
      await addBook(newBook, auth?.token || "");
    }
    fetchBooks();
  };

  const handleDelete = async (id: number) => {
    await deleteBook(id, auth?.token || "");
    fetchBooks();
  };

  const handleEditClick = (book: Book) => {
    setEditingBook(book);
  };

  const filteredBooks = books.filter(book =>
    book.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.frase.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>Administración de Libros</Typography>
      <TextField fullWidth label="Buscar por nombre, autor o frase" variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <StyledForm onSubmit={handleSubmit}>
        <TextField label="Nombre" value={editingBook ? editingBook.nombre : newBook.nombre} onChange={(e) => editingBook ? setEditingBook({ ...editingBook, nombre: e.target.value }) : setNewBook({ ...newBook, nombre: e.target.value })} required />
        <TextField label="Frase" value={editingBook ? editingBook.frase : newBook.frase} onChange={(e) => editingBook ? setEditingBook({ ...editingBook, frase: e.target.value }) : setNewBook({ ...newBook, frase: e.target.value })} required />
        <TextField label="Descripción" multiline rows={4} value={editingBook ? editingBook.descripcion : newBook.descripcion} onChange={(e) => editingBook ? setEditingBook({ ...editingBook, descripcion: e.target.value }) : setNewBook({ ...newBook, descripcion: e.target.value })} required />
        <TextField label="Autor" value={editingBook ? editingBook.autor : newBook.autor} onChange={(e) => editingBook ? setEditingBook({ ...editingBook, autor: e.target.value }) : setNewBook({ ...newBook, autor: e.target.value })} required />
        <TextField label="Páginas" type="number" value={editingBook ? editingBook.paginas : newBook.paginas} onChange={(e) => editingBook ? setEditingBook({ ...editingBook, paginas: parseInt(e.target.value) || 0 }) : setNewBook({ ...newBook, paginas: parseInt(e.target.value) || 0 })} required />
        <TextField label="URL de la imagen" value={editingBook ? editingBook.imagen_url : newBook.imagen_url} onChange={(e) => editingBook ? setEditingBook({ ...editingBook, imagen_url: e.target.value }) : setNewBook({ ...newBook, imagen_url: e.target.value })} required />
        <TextField label="Stock" type="number" value={editingBook ? editingBook.stock : newBook.stock} onChange={(e) => editingBook ? setEditingBook({ ...editingBook, stock: parseInt(e.target.value) || 1 }) : setNewBook({ ...newBook, stock: parseInt(e.target.value) || 1 })} required />
        <Button type="submit" variant="contained" color="primary">{editingBook ? "Actualizar Libro" : "Agregar Libro"}</Button>
      </StyledForm>
      <Grid container spacing={3} justifyContent="center">
        {filteredBooks.map(book => (
          <Grid item key={book.id}>
            <StyledCard>
            <CardContent>
                <Typography variant="h6">{book.nombre}</Typography>
                <Typography variant="body2">{book.descripcion}</Typography>
                <img src={book.imagen_url} alt={book.nombre} width="100%" />
                <Typography variant="body2"><strong>Stock:</strong> {book.stock} unidades</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleEditClick(book)} variant="contained" color="secondary">Editar</Button>
                <Button onClick={() => handleDelete(book.id)} variant="contained" color="error">Eliminar</Button>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  );
};
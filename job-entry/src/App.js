import React, { useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([
    { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", price: "$10" },
    { id: 2, title: "1984", author: "George Orwell", price: "$15" },
    { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: "$12" },
  ]);

  const [currentBook, setCurrentBook] = useState({ title: "", author: "", price: "" });
  const [editBookId, setEditBookId] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };

  // Add or update a book
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editBookId) {
      // Edit existing book
      setBooks(
        books.map((book) =>
          book.id === editBookId ? { ...book, ...currentBook } : book
        )
      );
      setEditBookId(null);
    } else {
      // Add new book
      setBooks([...books, { id: books.length + 1, ...currentBook }]);
    }
    setCurrentBook({ title: "", author: "", price: "" }); // Reset form
  };

  // Edit a book
  const handleEdit = (book) => {
    setCurrentBook(book);
    setEditBookId(book.id);
  };

  // Delete a book
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Online Book Shop</h1>
      </header>

      <main>
        {/* Book List */}
        <div className="book-list">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <h2>{book.title}</h2>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Price:</strong> {book.price}</p>
              <div className="actions">
                <button onClick={() => handleEdit(book)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(book.id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Book Form */}
        <div className="form-container">
          <h2>{editBookId ? "Edit Book" : "Add a New Book"}</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={currentBook.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Author:</label>
              <input
                type="text"
                name="author"
                value={currentBook.author}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="text"
                name="price"
                value={currentBook.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">{editBookId ? "Update Book" : "Add Book"}</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;

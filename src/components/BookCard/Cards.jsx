import React, { useState, useEffect } from "react";
import Card from "./Card";
import api from "../../api/index";
function Cards() {
  const [books, setBooks] = useState([]);
  const getBooks = async () => {
    try {
      const { data } = await api.get("/books/all");
      setBooks(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBooks();
  }, [books]);
  return (
    <>
      <div style={{ display: "flex" }}>
        {books &&
          books.map((book, index) => {
            return (
              <Card
                title={book.name}
                desc={book.desc}
                id={book._id}
                book_data={books}
                set_books={setBooks}
              />
            );
          })}
      </div>
    </>
  );
}

export default Cards;

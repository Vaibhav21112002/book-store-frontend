import React from "react";
import Cards from "./components/BookCard/Cards.jsx";
import BookForm from "./components/Form/BookForm.jsx";
import Navbar from "./components/Navbar.jsx";
function App() {
  return (
    <div style={{ margin: "0px", padding: "0px" }}>
      <Navbar />
      <Cards />
      <BookForm />
    </div>
  );
}

export default App;

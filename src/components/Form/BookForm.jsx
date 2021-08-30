import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import "./book.css";
import api from "../../api/index";
function BookForm(props) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const submitBooks = async () => {
    try {
      if (!name || !desc) {
        alert("All the field should must be filled\nData Uploading Failed");
        return;
      }

      if (desc.length < 20) {
        alert("Write a Longer Description\nData Uploading Failed");
        return;
      }
      await api.post("/books/add", {
        name: name,
        desc: desc,
      });
      props.set_books(props.book_data);
      alert("data Uploaded Successfully");
    } catch (err) {
      console.log(err);
    }
    setName("");
    setDesc("");
  };
  return (
    <div className="container">
      <h1>Book Store</h1>
      <div className="book-form">
        <TextField
          id="outlined-textarea"
          label="Book Name"
          placeholder="Name of the Book"
          variant="outlined"
          value={name}
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
          fullWidth
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          placeholder="Description of the Book"
          multiline
          rows={4}
          required
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={submitBooks}
          startIcon={<SaveIcon />}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default BookForm;

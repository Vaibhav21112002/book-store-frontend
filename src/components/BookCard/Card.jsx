import React, { useState } from "react";
import "./Card.css";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import api from "../../api/index";
import Modal from "react-awesome-modal";
function Card(props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [modal, setModal] = useState(false);
  const deleteCard = async (id) => {
    try {
      await api.delete(`/books/delete/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const updateCard = async (id) => {
    try {
      if (!name || !desc) {
        alert("All the field should must be filled\nData Uploading Failed");
        return;
      }

      if (desc.length < 20) {
        alert("Write a Longer Description\nData Uploading Failed");
        return;
      }
      await api.put(`/books/update/${id}`, {
        name: name,
        desc: desc,
      });
      alert("Card data Updated");
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="contain">
        <div className="header">
          <EditRoundedIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              setModal(true);
            }}
          />
          <DeleteRoundedIcon
            style={{ cursor: "pointer" }}
            onClick={() => deleteCard(props.id)}
          />
        </div>
        <div className="title">
          <h2>{props.title}</h2>
        </div>
        <div className="desc">{props.desc}</div>
      </div>
      <Modal
        visible={modal}
        width="400"
        height="300"
        effect="fadeInUp"
        onClickAway={() => setModal(false)}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
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
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => updateCard(props.id)}
            startIcon={<SaveIcon />}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Card;

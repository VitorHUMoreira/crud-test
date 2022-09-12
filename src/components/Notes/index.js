import { useState } from "react";
import axios from "axios";
import Note from "../Note";

import { Form, Button, InputGroup, FloatingLabel } from "react-bootstrap";

function Notes({ student, studentID, reload, setReload }) {
  const [noteInput, setNoteInput] = useState("");

  function handleChange(e) {
    setNoteInput(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const clone = { ...student };
      delete clone._id;

      clone.notes.push(noteInput);

      await axios.put(
        `https://ironrest.herokuapp.com/wd-85-ft/${studentID}`,
        clone
      );

      setNoteInput("");
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <FloatingLabel
            controlId="floatingTextarea1"
            label="Escreva uma nota aqui..."
          >
            <Form.Control
              as="textarea"
              value={noteInput}
              onChange={handleChange}
              placeholder="Escreva uma nota aqui..."
              style={{ height: "100px" }}
            />
          </FloatingLabel>
          <InputGroup.Text>
            <Button type="submit" variant="success">
              Salvar nota
            </Button>
          </InputGroup.Text>
        </InputGroup>
      </Form>

      <div className="d-flex flex-row flex-wrap justify-content-center mt-3 mb-3">
        {student.notes.map((note, index) => {
          return (
            <Note
              note={note}
              index={index}
              key={note}
              student={student}
              studentID={studentID}
              reload={reload}
              setReload={setReload}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Notes;

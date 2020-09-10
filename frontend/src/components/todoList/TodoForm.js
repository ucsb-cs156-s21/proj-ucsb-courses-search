import React, { useState } from "react";
import { Form } from "react-bootstrap";

export const TodoForm = ({ addTask }) => {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        value && addTask(value);
        setValue("");
      }}
    >
      <Form.Control
        type="text"
        placeholder="add todo"
        margin="normal"
        onChange={event => {
          setValue(event.target.value);
        }}
        value={value}
      />
    </form>
  );
};

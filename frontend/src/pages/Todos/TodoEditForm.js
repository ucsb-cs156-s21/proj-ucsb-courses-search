import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const TodoEditForm = ({ item, update }) => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(item.value);

  const buttonName = editMode ? "Done" : "Edit";
  const textDecoration = !editMode && item.done ? "line-through" : "none";

  const handleOnClickOrSubmit = (event) => {
    event.preventDefault();
    if (value.trim().length === 0) {
      return;
    }
    if (editMode) {
      const updatedItem = {
        ...item,
        value,
      };
      update(updatedItem, updatedItem.id);
    }
    setEditMode(!editMode);
  };

  return (
    <Form inline onSubmit={handleOnClickOrSubmit}>
      <Form.Control
        style={{ width: "90%", textDecoration }}
        type="text"
        placeholder="todo name"
        readOnly={!editMode}
        plaintext={!editMode}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={handleOnClickOrSubmit}>{buttonName}</Button>
    </Form>
  );
};

export default TodoEditForm;

import React from "react";
import { ListGroup, Button } from "react-bootstrap";

export function TodoItem({ item, index, toggleTodo, deleteTodo }) {
  return (
    <ListGroup.Item>
      <Button
        onClick={(e) => toggleTodo(index, item.id)}
        variant="link"
        style={{
          textDecorationLine: item.done ? "line-through" : "none",
          color: "black",
        }}
      >
        {item.value}
      </Button>
      <Button
        className="btn-danger float-right"
        onClick={(e) => deleteTodo(index, item.id)}
      >
        Delete
      </Button>
    </ListGroup.Item>
  );
}

import React from "react";
import { ListGroup, Button, Row, Col } from "react-bootstrap";
import CheckboxButton from "./CheckboxButton";

export function TodoItem({ item, index, toggleTodo, deleteTodo }) {
  const backgroundColor = item.done ? "#ddd" : "#fff";

  return (
    <ListGroup.Item style={{ backgroundColor }}>
      <Row>
        <Col md={1}>
          <CheckboxButton item={item} toggle={toggleTodo} />
        </Col>
        <Col md={10}>
          <div
            variant="link"
            style={{
              textDecorationLine: item.done ? "line-through" : "none",
              color: "black",
              padding: "8px",
            }}
          >
            {item.value}
          </div>
        </Col>
        <Col md={1}>
          <Button className="btn-danger" onClick={(e) => deleteTodo(item.id)}>
            Delete
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

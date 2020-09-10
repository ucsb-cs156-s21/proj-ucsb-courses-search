import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

export const TodoForm = ({ addTask }) => {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const text = value.trim();
        text && addTask(text);
        setValue("");
      }}
    >
      <Container fluid>
        <Row>
          <Col xs={11} style={{ padding: 0 }}>
            <Form.Control
              type="text"
              placeholder="add todo"
              margin="normal"
              onChange={(event) => {
                setValue(event.target.value);
              }}
              value={value}
            />
          </Col>
          <Col xs={1} style={{ padding: 0 }}>
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Container>
    </form>
  );
};

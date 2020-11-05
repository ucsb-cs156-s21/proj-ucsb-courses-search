import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const TodosButton = () => {
  return (
    <LinkContainer to={"/todos"}>
      <Nav.Link>Todos</Nav.Link>
    </LinkContainer>
  );
};

export default TodosButton;

import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AuthNav from "main/components/Nav/AuthNav";

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <LinkContainer to={""}>
        <Navbar.Brand data-testid="brand">Demo Spring React App</Navbar.Brand>
      </LinkContainer>
      <Nav>
        <LinkContainer to={"/todos"}>
          <Nav.Link>Todos</Nav.Link>
        </LinkContainer>
        <LinkContainer to={"/profile"}>
          <Nav.Link>Profile</Nav.Link>
        </LinkContainer>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <AuthNav />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;

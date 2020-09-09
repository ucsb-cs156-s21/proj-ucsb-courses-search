import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import LoginButton from "./LoginButton";

function AppNavbar() {
  return (
    <Navbar>
      <Navbar.Brand href="#home">Demo Spring React App</Navbar.Brand>
      <Nav>
        <Nav.Link href="#home">Todos</Nav.Link>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <Nav.Link href="#profile">User Info</Nav.Link>
        <LoginButton />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;

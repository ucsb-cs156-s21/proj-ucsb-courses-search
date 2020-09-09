import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import AuthNav from "./AuthNav";

function AppNavbar() {
  return (
    <Navbar>
      <Navbar.Brand href="#home">Demo Spring React App</Navbar.Brand>
      <Nav>
        <Nav.Link href="#home">Todos</Nav.Link>
        <Nav.Link href="#profile">Profile</Nav.Link>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <AuthNav />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;

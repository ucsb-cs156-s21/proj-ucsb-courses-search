import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import AuthNav from "./AuthNav";

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Demo Spring React App</Navbar.Brand>
      <Nav>
        <Nav.Link href="/r/todos">Todos</Nav.Link>
        <Nav.Link href="/r/profile">Profile</Nav.Link>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <AuthNav />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;

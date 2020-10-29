import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AuthNav from "main/components/Nav/AuthNav";
import TodosNav from "main/components/Nav/TodosNav";
import ProfileNav from "main/components/Nav/ProfileNav";

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <LinkContainer to={""}>
        <Navbar.Brand data-testid="brand">Demo Spring React App</Navbar.Brand>
      </LinkContainer>
      <Nav>
        <TodosNav />
        <ProfileNav />
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <AuthNav />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;

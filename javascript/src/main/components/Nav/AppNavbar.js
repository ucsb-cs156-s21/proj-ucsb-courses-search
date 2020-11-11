import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AuthNav from "main/components/Nav/AuthNav";
import TodosNav from "main/components/Nav/TodosNav";
import ProfileNav from "main/components/Nav/ProfileNav";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWithToken } from "main/utils/fetch";


function AppNavbar() {
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { data: roleInfo } = useSWR(
    ["/api/myRole", getToken],
    fetchWithToken
  );
  const isAdmin = roleInfo && roleInfo.role.toLowerCase() === "admin";

  return (
    <Navbar bg="dark" variant="dark">
      <LinkContainer to={""}>
        <Navbar.Brand data-testid="brand">UCSB Courses Search</Navbar.Brand>
      </LinkContainer>
      <Nav>
        { isAdmin &&
          (<LinkContainer to={"/admin"}>
            <Nav.Link>Admin</Nav.Link>
          </LinkContainer>)
        }
        <TodosNav />
        <LinkContainer to={"/about"}>
            <Nav.Link>About</Nav.Link>
        </LinkContainer>
        <ProfileNav />
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <AuthNav />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;

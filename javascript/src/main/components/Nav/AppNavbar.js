import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import AuthNav from "main/components/Nav/AuthNav";
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
        <NavDropdown title="Course History">
            <NavDropdown.Item href="/history/basic">Basic Search</NavDropdown.Item>
            <NavDropdown.Item href="/history/courseName">Search By Course Name</NavDropdown.Item>
            <NavDropdown.Item href="/history/ge">GE Search</NavDropdown.Item>
        </NavDropdown>
        { isAdmin &&
          (<LinkContainer to={"/admin"}>
            <Nav.Link>Admin</Nav.Link>
          </LinkContainer>)
        }
        <LinkContainer to={"/about"}>
            <Nav.Link>About</Nav.Link>
        </LinkContainer>
        <NavDropdown title="Statistics">
          <NavDropdown.Item as={Link} to="/statistics">
            Full Classes by Department
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/statistics">
            Course Occupancy by Department
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/statistics/courseOccupancyByDivision">
            Course Occupancy by Class Division
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/statistics/classSize">
            Average Class Size by Department
          </NavDropdown.Item>
        </NavDropdown>
        <ProfileNav />
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <AuthNav />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;

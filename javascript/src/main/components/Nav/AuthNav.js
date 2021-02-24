import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Nav } from "react-bootstrap";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const AuthNav = () => {
  const { user } = useAuth0();
  if(user) {
    const { name, picture } = user;
    return <>
    <LinkContainer to={"/profile"}>
      <Nav.Link style={{marginRight: 15}}>{"Hello, " + name}</Nav.Link>
    </LinkContainer>  
      <img
            src={picture}
            alt="Profile"
            className="rounded-circle"
            width="36"
            style={{marginRight: 15}}
      />
      <LogoutButton />
    </>
  } else {
    return <LoginButton/>
  }
};

export default AuthNav;

import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ProfileButton = () => {
  return (
    <LinkContainer to={"/profile"}>
      <Nav.Link>Profile</Nav.Link>
    </LinkContainer>
  );
};

export default ProfileButton;

import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ScheduleButton = () => {
  return (
    <LinkContainer to={"/schedule"}>
      <Nav.Link>Personal Schedule</Nav.Link>
    </LinkContainer>
  );
};

export default ScheduleButton;

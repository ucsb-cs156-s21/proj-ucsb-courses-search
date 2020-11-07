import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

export const TodoFilters = ({ filter, setFilter }) => {
  return (
    <DropdownButton 
      title={"Filter By: " + filter}
      style={{ padding: 5 }}
      onSelect={(event) => {
        setFilter(event);
      }}
    >
      <Dropdown.Item eventKey="All">All</Dropdown.Item>
      <Dropdown.Item eventKey="Incomplete">Incomplete</Dropdown.Item>
      <Dropdown.Item eventKey="Complete">Complete</Dropdown.Item>
    </DropdownButton>
  );
};

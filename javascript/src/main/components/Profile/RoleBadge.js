import React from 'react';
import { Badge } from "react-bootstrap";

export default function RoleBadge(props) {
  const { roleInfo } = props;
  return (
    roleInfo ?
      <Badge variant="primary">{roleInfo.role}</Badge> :
      <span>Loading role...</span>
  );
}
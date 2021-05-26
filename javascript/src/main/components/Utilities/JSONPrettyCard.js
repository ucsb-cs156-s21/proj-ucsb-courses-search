import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Accordion } from "react-bootstrap";
import JSONPretty from "react-json-pretty";

const JSONPrettyCard = (props) => {
  const [activeKey, setActiveKey] = useState(null);

  return (null);
};

JSONPrettyCard.propTypes = {
  expression: PropTypes.string.isRequired,
};

export default JSONPrettyCard;

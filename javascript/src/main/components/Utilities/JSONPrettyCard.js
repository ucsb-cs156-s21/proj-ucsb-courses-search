import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Card, Accordion } from "react-bootstrap";
import JSONPretty from "react-json-pretty";

const JSONPrettyCard = (props) => {
  const [activeKey, setActiveKey] = useState(null);

  return (
    <Card id={`JSONPrettyPanel-${props.expression}`}>
      <Card.Body>
        <Accordion onSelect={(eventKey) => setActiveKey(eventKey)}>
          <Accordion.Toggle
            style={{ cursor: "pointer" }}
            as={Card.Header}
            variant="link"
            eventKey="0"
          >
            {props.expression} ({activeKey === "0" ? "visible" : "hidden"})
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <JSONPretty data={props.value} />
          </Accordion.Collapse>
        </Accordion>
      </Card.Body>
    </Card>
  );
};

JSONPrettyCard.propTypes = {
  expression: PropTypes.string.isRequired,
};

export default JSONPrettyCard;

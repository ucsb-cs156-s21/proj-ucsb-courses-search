import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Accordion } from "react-bootstrap";
import JSONPretty from "react-json-pretty";

const JSONPrettyCard = (props) => {
  const [activeKey, setActiveKey] = useState(null);

  return (
    <Card>
      <Card.Body>
        <Accordion onSelect={(eventKey) => setActiveKey(eventKey)}>
          <Accordion.Toggle
            data-testid={`JSONPrettyPanel-${props.expression}-toggle`}
            style={{ cursor: "pointer" }}
            as={Card.Header}
            variant="link"
            eventKey="0"
          >
            Click here to {activeKey === "0" ? "show" : "hide"} the{" "}
            {props.expression} response
          </Accordion.Toggle>
          <Accordion.Collapse
            eventKey="0"
            data-testid={`JSONPrettyPanel-${props.expression}-collapse`}
          >
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

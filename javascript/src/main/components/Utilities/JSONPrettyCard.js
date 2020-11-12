import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap'
import JSONPretty from 'react-json-pretty';
export default class JSONPrettyCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <Card id={`JSONPrettyPanel-${this.props.expression}`}>
                    <Card.Body>
                        <Card.Title><code>{this.props.expression}</code></Card.Title>
                        <JSONPretty data={this.props.value} />
                    </Card.Body>
                </Card>
            </Fragment>
        );
    }
}
JSONPrettyCard.propTypes = {
    expression: PropTypes.string.isRequired,
};
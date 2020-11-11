import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap'
import JSONPretty from 'react-json-pretty';
export default class JSONPrettyPanel extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <Card id={`JSONPrettyPanel-${this.props.expression}`}>
                    <Card.Body>
                        <Card.Title><code>{this.props.expression}</code></Card.Title>
                        <Card.Text>
                            <JSONPretty data={this.props.value} />
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Fragment>
        );
    }
}
JSONPrettyPanel.propTypes = {
    expression: PropTypes.string.isRequired,
};
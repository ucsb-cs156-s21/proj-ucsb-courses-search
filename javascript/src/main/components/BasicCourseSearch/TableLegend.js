import React from "react";
import { Jumbotron } from "react-bootstrap";

const COLOR_UNAVAILABLE = { backgroundColor: '#FF0000' };
const COLOR_CLOSEFULL = { backgroundColor: '#FFBF00' };
const COLOR_AVAILABLELECTUREORCLASSWITHSECTIONS = { backgroundColor: '#CEDEFA' };
const COLOR_AVAILABLESECTION = { backgroundColor: '#EDF3FE' };

const TableLegend = () => {
    return (
        <Jumbotron>
            <div className="text-left">
                <table cellPadding="5px">
                    <thead>
                        <tr>
                            <th>Full/Closed</th>
                            <th>Almost Full</th>
                            <th>Available Lecture</th>
                            <th>Available Section</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={COLOR_UNAVAILABLE}></td>
                            <td style={COLOR_CLOSEFULL}></td>
                            <td style={COLOR_AVAILABLELECTUREORCLASSWITHSECTIONS}></td>
                            <td style={COLOR_AVAILABLESECTION}></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Jumbotron>
    );
};

export default TableLegend;

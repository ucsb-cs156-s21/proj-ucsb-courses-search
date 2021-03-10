import React from "react";
import { Jumbotron } from "react-bootstrap";

const COLOR_UNAVAILABLE = {backgroundColor: '#FF0000'};
const COLOR_CLOSEFULL = {backgroundColor: '#FFBF00'};
const COLOR_AVAILABLELECTUREORCLASSWITHSECTIONS = {backgroundColor: '#CEDEFA'};
const COLOR_AVAILABLESECTION = {backgroundColor: '#EDF3FE'};

const TableLegend = () => {
    return (
	<Jumbotron>
	    <div className="text-left">
		<table cellpadding="5px">
                <tr>
                    <th>Full/Closed</th>
                    <th>Almost Full</th>
                    <th>Available Section</th>
                    <th>Available Standalone Class or Class With Sections</th>
                </tr>
                <tr>
                    <td style={{COLOR_UNAVAILABLE}}></td>
                    <td style={{COLOR_CLOSEFULL}}></td>
                    <td style={{COLOR_AVAILABLELECTUREORCLASSWITHSECTIONS}}></td>
                    <td style={{COLOR_AVAILABLESECTION}}></td>
                </tr>
                </table>
	    </div>
	</Jumbotron>
    );
};

export default TableLegend; 

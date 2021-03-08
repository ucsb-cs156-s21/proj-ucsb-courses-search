import React from "react";
import { Jumbotron } from "react-bootstrap";

const TableLegend = () => {
    return (
	<Jumbotron>
	    <div className="text-left">
		<table cellpadding="5px">
                <tr>
                    <th>Full/Closed</th>
                    <th>Almost Full</th>
                    <th>Empty</th>
                </tr>
                <tr>
                    <td style={{backgroundColor: "red"}}></td>
                    <td style={{backgroundColor: "orange"}}></td>
                    <td style={{backgroundColor: "lightblue"}}></td>
                </tr>
                </table>
	    </div>
	</Jumbotron>
    );
};

export default TableLegend; 

import React from "react";
import { availabilityColors } from "main/utils/BasicCourseTableHelpers"

const TableLegend = () => {
    return (
        <>
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
                            <td style={availabilityColors.COLOR_UNAVAILABLE}></td>
                            <td style={availabilityColors.COLOR_CLOSEFULL}></td>
                            <td style={availabilityColors.COLOR_AVAILABLELECTUREORCLASSWITHSECTIONS}></td>
                            <td style={availabilityColors.COLOR_AVAILABLESECTION}></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TableLegend;

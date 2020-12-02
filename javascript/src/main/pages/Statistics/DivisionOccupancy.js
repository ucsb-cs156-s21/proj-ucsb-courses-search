import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { fetchDivisionOccupancy } from "main/services/statisticsService";
import JSONPrettyCard from "main/components/Utilities/JSONPrettyCard";
import DivisionOccupancyForm from "main/components/Statistics/DivisionOccupancyForm";

const DivisionOccupancy = () => {
    const [courseJSON, setCourseJSON] = useState('{"course" : "cs148"}');

    // const courseJSON = '{"course" : "cs156"}';
    return (
        <p>Hello World!</p>
        /*<Jumbotron> 
            <div className="text-left">
                <h5>Search Archived Course Data from MongoDB by Division Occupancy</h5>
                <DivisionOccupancyForm setCourseJSON={setCourseJSON} fetchJSON={fetchDivisionOccupancy} />
                <JSONPrettyCard
                    expression={"courseJSON"}
                    value={courseJSON}
                />
            </div>
        </Jumbotron>*/
    );
};

export default DivisionOccupancy;

import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { fetchDivisionOccupancy } from "main/services/statisticsService";
import DivisionOccupancyForm from "main/components/Statistics/DivisionOccupancyForm";
import DivisionOccupancyTable from "main/components/Statistics/DivisionOccupancyTable"

const DivisionOccupancy = () => {
    const [courseJSON, setCourseJSON] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);

    return (
        <div>
            <Jumbotron> 
                <div className="text-left">
                    <h5>Search Archived Course Data from MongoDB by Division Occupancy</h5>
                    <DivisionOccupancyForm setCourseJSON={setCourseJSON} fetchJSON={fetchDivisionOccupancy} setFormSubmitted={setFormSubmitted}/>
                </div>
            </Jumbotron>
            {formSubmitted && <DivisionOccupancyTable data={courseJSON} />}
        </div>
    );
};

export default DivisionOccupancy;

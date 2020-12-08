import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { fetchDivisionOccupancy } from "main/services/statisticsService";
import DivisionOccupancyForm from "main/components/Statistics/DivisionOccupancyForm";
import DivisionOccupancyTable from "main/components/Statistics/DivisionOccupancyTable";
import { fromFormat } from "main/components/Statistics/QuarterFormSelect";

const DivisionOccupancy = () => {
    const [courseJSON, setCourseJSON] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const setInitialData = (courseJSON) => {
        let newArray = courseJSON.map((item, index) => ({index, ...item}));
        for (var i = 0; i < newArray.length; i++) {
            newArray[i].index++;
        }
        newArray.forEach((item) => {
            item["quarter"] = fromFormat(item["quarter"]);
        });
        setCourseJSON(newArray);
        setFormSubmitted(true);
    }

    return (
        <div>
            <Jumbotron> 
                <div className="text-left">
                    <h5>Search Archived Course Data from MongoDB by Division Occupancy</h5>
                    <DivisionOccupancyForm setCourseJSON={setInitialData} fetchJSON={fetchDivisionOccupancy} setFormSubmitted={setFormSubmitted}/>
                </div>
            </Jumbotron>
            
            {formSubmitted && (courseJSON.length == 0) ? 'There are no results!' : <DivisionOccupancyTable data={courseJSON} />}
        </div>
    );
};

export default DivisionOccupancy;

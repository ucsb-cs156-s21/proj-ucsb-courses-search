import React from "react";
import { Jumbotron } from "react-bootstrap";
import { useState } from "react";
import { fetchDivisionOccupancy } from "main/services/statisticsService";
import AggregateStatisticsForm from "main/components/Statistics/AggregateStatisticsForm";
import AggregateStatisticsTable from "main/components/Statistics/AggregateStatisticsTable";
import { fromFormat } from "main/components/Statistics/QuarterFormSelect";
const Statistics = () => {
    const [courseJSON, setCourseJSON] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);

    // transforms quarter JSON item from quarter code (like 20204) to human-readable text 
    // like "WINTER 2021" using fromFormat function from the QuarterFormSelect file
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
        <Jumbotron>
            <div className="text-left">
                <h5>Summarize Department Statistics</h5>
                <AggregateStatisticsForm setCourseJSON={setInitialData} fetchJSON={fetchDivisionOccupancy}/>
            </div>
        </Jumbotron>
    );

};

export default Statistics;

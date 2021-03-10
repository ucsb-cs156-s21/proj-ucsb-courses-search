import React from "react";
import { useState } from "react";
import { Jumbotron, Container } from "react-bootstrap";
import { fetchAggregateStatistics } from "main/services/statisticsService";
import AggregateStatisticsTable from "main/components/Statistics/AggregateStatisticsTable";
import AggregateStatisticsForm from "main/components/Statistics/AggregateStatisticsForm";

const calcPercent = (num) => {
    return (parseFloat(num) * 100).toFixed(0);
};

const AggregateStatistics = () => {
    const initialData = [];
    const [data, setData] = useState(initialData);
    const [tableVisibility, setTableVisibility] = useState(false);

    const setJsonTableData = (json) => {
        if (json !== ""){
            json.forEach((item) => {
                item["courseOccupancy"] = calcPercent(item["courseOccupancy"]);
            });
            setData(json);
            setTableVisibility(true);
        } else{    // date range exceeded 3 years
            setData("");
            setTableVisibility(true);
        }

    }



    return (
        <Jumbotron>
            <Container className="text-left">
                <h1>Aggregate Statistics</h1>
                <AggregateStatisticsForm setAggregateStatisticsJSON={setJsonTableData} fetchAggregateStatistics={fetchAggregateStatistics}/>
            </Container>
            <Container style={{ marginTop: "20px" }} className={"text-center"}>
                {tableVisibility && ((data.length || (data !== "")) ? <AggregateStatisticsTable data={data} /> : "There are no results! Try using a date range of 3 years or less.")}
            </Container>
        </Jumbotron>

    );
};

export default AggregateStatistics; 

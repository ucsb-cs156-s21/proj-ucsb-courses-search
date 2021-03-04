import React from "react";
import { useState } from "react";
import { Jumbotron, Container } from "react-bootstrap";
import { fetchAggregateStatistics } from "main/services/statisticsService";
import AggregateStatisticsTable from "main/components/Statistics/AggregateStatisticsTable";
import AggregateStatisticsForm from "main/components/Statistics/AggregateStatisticsForm";


const AggregateStatistics = () => {
    const initialData = [];
    const [data, setData] = useState(initialData);
    const [tableVisibility, setTableVisibility] = useState(false);

    const setJsonTableData = (json) => {
        setData(json);
        setTableVisibility(true);
    }



    return (
        <Jumbotron>
            <Container className="text-left">
                <h1>Aggregate Statistics</h1>
                <AggregateStatisticsForm setAggregateStatisticsJSON={setJsonTableData} fetchAggregateStatistics={fetchAggregateStatistics}/>
            </Container>
            <Container style={{ marginTop: "20px" }} className={"text-center"}>
                {tableVisibility && (data.length ? <AggregateStatisticsTable data={data} /> : "There are no results!")}
            </Container>
        </Jumbotron>

    );
};

export default AggregateStatistics; 

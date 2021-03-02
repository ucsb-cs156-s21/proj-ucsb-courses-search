import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
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
            <AggregateStatisticsForm setAggregateStatisticsJSON={setJsonTableData} fetchAggregateStatistics={fetchAggregateStatistics}/>
            {tableVisibility && (data.length ? <AggregateStatisticsTable data={data} /> : "There are no results!")}
        </Jumbotron>

    );
};

export default AggregateStatistics; 
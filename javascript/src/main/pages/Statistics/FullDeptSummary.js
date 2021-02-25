import React from "react";
import { useState } from "react";
import { Jumbotron, Container } from "react-bootstrap";
import { fetchFullDept } from "main/services/statisticsService";
import FullDeptForm from "main/components/Statistics/FullDeptForm";
import FullDeptTable from "main/components/Statistics/FullDeptTable";

const FullDeptSummary = () => {
  const initialData = [];
  const [data, setData] = useState(initialData);
  const [tableVisibility, setTableVisibility] = useState(false);

  const setJsonTableData = (json) => {
      setData(json);
      setTableVisibility(true);
    }

    return (
        <Jumbotron>
            <FullDeptForm setFullDeptJSON={setJsonTableData} fetchFullDept={fetchFullDept} />
            {tableVisibility && (data.length ? <FullDeptTable data={data} /> : "There are no results!")}
        </Jumbotron>
    );
};

export default FullDeptSummary;

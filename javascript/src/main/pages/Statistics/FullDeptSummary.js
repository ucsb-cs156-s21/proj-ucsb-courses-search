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
            <Container className="text-left">
                <h1>Full Department Courses Summary</h1>
                <FullDeptForm setFullDeptJSON={setJsonTableData} fetchFullDept={fetchFullDept} onSubmit={() => { setTableVisibility(false) }} />
            </Container>
            <Container style={{ marginTop: "20px" }} className={"text-center"}>
                {tableVisibility && (tableData.length ? <FullDeptTable data={tableData} /> : "There are no results!")}
            </Container>
        </Jumbotron>
    );
};

export default FullDeptSummary;

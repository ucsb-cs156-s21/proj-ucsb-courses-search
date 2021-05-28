import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

const AddToScheduleTable = ({ data, createScheduleItem }) => {
  const history = useHistory();
  const {discussionCode} = useParams();

  const renderAddToButton = (id) => {
     return (
       <Button data-testid={`add-to-button-${id}`} onClick={async () => {
        
        const scheduleItem = {
          scheduleId: id,
          lectureCode: "55",
          discussionCode: discussionCode
        }
        await createScheduleItem(scheduleItem);
        history.push('/');
       }}>Add To</Button>
     )
  }

  const columns = [{
    dataField: 'id',
    text: 'id'
  },
  {
    dataField: 'name',
    text: 'Name',
    align: "left",
    headerAlign: "left",
    formatter: (cell, row) => <a href={"/schedule/" + row.id}> {cell} </a>
  },
  {
    dataField: 'description',
    text: 'Description',
    align: "left",
    headerAlign: "left"
  },
  {
    dataField: 'quarter',
    text: 'Quarter'
  },
  {
     text: "Add To",
     isDummyField: true,
     dataField: "add to",
     formatter: (_cell, row) => renderAddToButton(row.id)
  }];

  return (
    <BootstrapTable keyField='id' data={data || []} columns={columns} />
  );
};

export default AddToScheduleTable;
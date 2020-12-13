import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ScheduleTable = ({ data, deleteSchedule }) => {

  const history = useHistory();
  const renderEditButton = (id) => {
    return (
      <Button data-testid="edit-button" onClick={() => { history.push(`/schedules/edit/${id}`) }}>Edit</Button>
    )
  }

  const renderDeleteButton = (id) => {
    return (
      <Button variant="danger" data-testid="delete-button" onClick={() => {
        console.log("id=",id);
        return deleteSchedule(id);
      }}>Delete</Button>
    )
  }

  const columns = [{
    dataField: 'id',
    text: 'id'
  }, {
    dataField: 'name',
    text: 'Name'
  },
  {
    dataField: 'description',
    text: 'Description'
  },
  {
    dataField: 'quarter',
    text: 'Quarter'
  },
  {
    text: "Edit",
    isDummyField: true,
    dataField: "edit",
    formatter: (cell, row) => renderEditButton(row.id)
  }, {
    text: "Delete",
    isDummyField: true,
    dataField: "delete",
    formatter: (cell, row) => renderDeleteButton(row.id)
  }
  ];

  return (
    <BootstrapTable keyField='_id' data={data || []} columns={columns} />
  );
};

export default ScheduleTable;
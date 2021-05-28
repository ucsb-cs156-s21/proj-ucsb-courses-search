import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { yyyyqToQyy } from 'main/utils/quarterUtilities';

const ScheduleTable = ({ data, deleteSchedule }) => {
  const history = useHistory();
  const renderEditButton = (id) => {
    return (
      <Button
        data-testid={`edit-button-${id}`}
        onClick={() => {
          history.push(`/schedule/update/${id}`);
        }}
      >
        Edit
      </Button>
    );
  };

  const renderDeleteButton = (id) => {
    return (
      <Button
        variant="danger"
        data-testid={`delete-button-${id}`}
        onClick={() => {
          return deleteSchedule(id);
        }}
      >
        Delete
      </Button>
    );
  };

  const columns = [
    {
      dataField: 'id',
      text: 'id',
    },
    {
      dataField: 'name',
      text: 'Name',
      align: 'left',
      headerAlign: 'left',
      formatter: (cell, row) => <a href={'/schedule/' + row.id}> {cell} </a>,
    },
    {
      dataField: 'description',
      text: 'Description',
      align: 'left',
      headerAlign: 'left',
    },
    {
      dataField: 'quarter',
      text: 'Quarter',
      formatter: (cell, _row) => <p> {yyyyqToQyy(cell)}</p>,
    },
    {
      text: 'Edit',
      isDummyField: true,
      dataField: 'edit',
      formatter: (_cell, row) => renderEditButton(row.id),
    },
    {
      text: 'Delete',
      isDummyField: true,
      dataField: 'delete',
      formatter: (_cell, row) => renderDeleteButton(row.id),
    },
  ];

  return <BootstrapTable keyField="id" data={data || []} columns={columns} />;
};

export default ScheduleTable;

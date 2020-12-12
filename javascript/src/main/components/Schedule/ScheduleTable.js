import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const ScheduleTable = ( {data} ) => {

  const columns = [{
    dataField: 'id',
    text: 'id'
  },{
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
  }
  ];

  return (
    <BootstrapTable keyField='_id' data={data || []} columns={columns} />
  );
};

export default ScheduleTable;
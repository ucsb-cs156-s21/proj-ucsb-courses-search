import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const ClassSizeTable = ( {data} ) => {

  const columns = [{
    dataField: '_id',
    text: 'Department'
  },{
    dataField: 'avgClassSize',
    text: 'Average Class Size'
  },
];

  return (
    <BootstrapTable keyField='_id' data={data} columns={columns} />
  );
};

export default ClassSizeTable;
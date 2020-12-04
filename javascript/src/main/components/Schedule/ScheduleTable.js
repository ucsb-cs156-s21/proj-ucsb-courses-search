import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
//import { Button } from "react-bootstrap";
//import { useHistory } from "react-router-dom";

//import { buildDeleteCourse } from "main/services/Courses/CourseService";

//export default ({courses,admin,deleteCourse}) => {
export default ({courses,admin}) => {
//    const history = useHistory();

//    const renderEditButton = (id) => {
//        return (
//            <Button data-testid="edit-button" onClick={() => { history.push(`/courses/edit/${id}`) }}>Edit</Button>
//        )
//    }
//
//    const renderDeleteButton = (id) => {
//        return (
//            <Button variant="danger" data-testid="delete-button" onClick={() => deleteCourse(id)}>Delete</Button>
//        )
//    }

    const columns = [{
        dataField: 'time',
        text: 'Time'
    }, {
        dataField: 'monday',
        text: 'Monday'
    }, {
        dataField: 'tuesday',
        text: 'Tuesday'
    }, {
        dataField: 'wednesday',
        text: 'Wednesday'
    }, {
        dataField: 'thursday',
        text: 'Thursday'
    }, {
        dataField: 'friday',
        text: 'Friday'
    }, {
        dataField: 'saturday',
        text: 'Saturday'
    }, {
        dataField: 'sunday',
        text: 'Sunday'
    }];

//    if (admin) {
//        columns.push({
//            text: "Edit",
//            isDummyField: true,
//            dataField: "edit",
//            formatter: (cell, row) => renderEditButton(row.id)
//        });
//        columns.push({
//            text: "Delete",
//            isDummyField: true,
//            dataField: "delete",
//            formatter: (cell, row) => renderDeleteButton(row.id)
//        });
//    }

    return (
        <BootstrapTable keyField='id' data={courses} columns={columns} />
    );
}
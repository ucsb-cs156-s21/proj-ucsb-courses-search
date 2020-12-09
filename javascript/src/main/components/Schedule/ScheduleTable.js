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
    var temp = null
    const courseTable = [
        {time:'8:00-9:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp},
        {time:'9:00-10:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp},
        {time:'10:00-11:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp},
        {time:'11:00-12:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp},
        {time:'12:00-13:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp},
        {time:'13:00-14:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp},
        {time:'13:00-14:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp},
        {time:'14:00-15:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp},
        {time:'15:00-16:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp},
        {time:'16:00-17:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp},
        {time:'17:00-18:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp},
        {time:'18:00-19:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp},
        {time:'19:00-20:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp},
        {time:'20:00-21:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp},
        {time:'21:00-22:00',monday:temp,tuesday:temp,wednesday:temp,thursday:temp,friday:temp}
    ]
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
    // for(var i = 0; i < courses.courses.size(); i++){
        
    // };
    return (

        <BootstrapTable keyField='id' data={courseTable} columns={columns} />
    );
}
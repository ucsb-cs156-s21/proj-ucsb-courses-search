import React from "react";
import { render } from "@testing-library/react";
import ScheduleTable from "main/components/Schedule/ScheduleTable";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const schedulesList = [{
    "id": 1,
    "name": "first",
    "description": "first schedule",
    "quarter": "fall 2020",
    "userId": "123456"
  },{
    "id": 2,
    "name": "second",
    "description": "second schedule",
    "quarter": "fall 2020",
    "userId": "123456"
  }
];

describe("ScheduleForm tests", () => {
  test("renders without crashing", () => {
    
    const deleteSchedule = jest.fn();

    render(<ScheduleTable
        data={schedulesList}
        deleteSchedule={deleteSchedule}
      />);
  });

  test("renders with edit/delete buttons ", () => {
    
    const deleteSchedule = jest.fn();

    const { getByTestId } = render(
    <Router history={createMemoryHistory()}>
        <ScheduleTable
            data={schedulesList}
            deleteSchedule={deleteSchedule}
        />
    </Router>
      );

    const deleteButton = getByTestId('delete-button-1');  
    expect(deleteButton).toBeInTheDocument();
    userEvent.click(deleteButton);


    const editButton = getByTestId('edit-button-2');
    expect(editButton).toBeInTheDocument();
    userEvent.click(editButton);

  });


});
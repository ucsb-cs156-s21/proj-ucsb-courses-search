import React from "react";
import { render } from "@testing-library/react";
import AddToScheduleTable from "main/components/Schedule/AddToScheduleTable";
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

describe("AddToScheduleForm tests", () => {
  test("renders without crashing", () => {
    render(<AddToScheduleTable />);
  });

  test("renders with schedule", async () => {
    const { findByText } = render(<AddToScheduleTable 
      data={schedulesList}
    />);

    await findByText("first");
    await findByText("second");
  });

  // test("renders with add to button ", () => {
    
    

  //   const { getByTestId } = render(
  //   <Router history={createMemoryHistory()}>
  //       <AddToScheduleTable
  //           data={schedulesList}
  //       />
  //   </Router>
  //     );

  //   const addToButton = getByTestId('add-to-button-1');  
  //   expect(addToButton).toBeInTheDocument();
  //   userEvent.click(addToButton);

  // });


});
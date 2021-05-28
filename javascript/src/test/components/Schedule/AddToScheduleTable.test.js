import React from "react";
import { render } from "@testing-library/react";
import AddToScheduleTable from "main/components/Schedule/AddToScheduleTable";
import userEvent from "@testing-library/user-event";
import { useParams, useHistory } from "react-router-dom";
import { createMemoryHistory } from "history";
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
  useParams: jest.fn()
}));
const {Router} = jest.requireActual("react-router-dom");

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
  beforeEach(() => {
    const mutateSpy = jest.fn();
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });
    useParams.mockReturnValue({
      data: {
        discussionCode: "55",
      },
      error: undefined,
      mutate: mutateSpy,
    });
  });

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

  test("renders with add to button ", () => {
    
    const createScheduleItem = jest.fn();

    const { getByTestId } = render(
    <Router history={createMemoryHistory()}>
        <AddToScheduleTable
            data={schedulesList}
            createScheduleItem={createScheduleItem}
        />
    </Router>
      );

    const addToButton = getByTestId('add-to-button-1');  
    expect(addToButton).toBeInTheDocument();
    userEvent.click(addToButton);

  });


});
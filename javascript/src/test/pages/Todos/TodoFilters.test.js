import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoFilters } from "main/pages/Todos/TodoFilters";

describe("TodoFilter tests", () => {
  test("renders without crashing", () => {
    render(<TodoFilters />);
  });

  test("dropdown text includes the current filter", () => {
    const filter = "All";
    const setFilter = jest.fn();
    render(<TodoFilters filter={filter} setFilter={setFilter} />);
    const dropdown = screen.getByText("Filter By: All");
    expect(dropdown).toBeInTheDocument();
  });

  test("clicking All sets filter to All", () => {
    const filter = "test";
    const setFilter = jest.fn();
    render(<TodoFilters filter={filter} setFilter={setFilter} />);
    const dropdown = screen.getByText("Filter By: test");
    userEvent.click(dropdown);
    const allButton = screen.getByText("All");
    userEvent.click(allButton);
    expect(setFilter).toHaveBeenCalledWith("All");
  });

  test("clicking Incomplete sets filter to Incomplete", () => {
    const filter = "All";
    const setFilter = jest.fn();
    render(<TodoFilters filter={filter} setFilter={setFilter} />);
    const dropdown = screen.getByText("Filter By: All");
    userEvent.click(dropdown);
    const incompleteButton = screen.getByText("Incomplete");
    userEvent.click(incompleteButton);
    expect(setFilter).toHaveBeenCalledWith("Incomplete");
  });

  test("clicking Complete sets filter to Complete", () => {
    const filter = "All";
    const setFilter = jest.fn();
    render(<TodoFilters filter={filter} setFilter={setFilter} />);
    const dropdown = screen.getByText("Filter By: All");
    userEvent.click(dropdown);
    const completeButton = screen.getByText("Complete");
    userEvent.click(completeButton);
    expect(setFilter).toHaveBeenCalledWith("Complete");
  });
});

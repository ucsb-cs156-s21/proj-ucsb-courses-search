import React from "react";
import { waitFor, render } from "@testing-library/react";
import useSWR from "swr";
jest.mock("swr");
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
import TodoList from "main/pages/Todos/Todos";
import userEvent from "@testing-library/user-event";
import { fetchWithToken } from "main/utils/fetch";
jest.mock("main/utils/fetch");
describe("TodoList test", () => {
  const todos = [
    {
      value: "incomplete todo",
      id: 1,
      done: false,
    },
    {
      value: "complete todo",
      id: 2,
      done: true,
    },
  ];
  const user = {
    name: "test user",
  };
  const getAccessTokenSilentlySpy = jest.fn();
  const mutateSpy = jest.fn();
  beforeEach(() => {
    useAuth0.mockReturnValue({
      user,
      getAccessTokenSilently: getAccessTokenSilentlySpy,
    });
    useSWR.mockReturnValue({
      data: todos,
      error: undefined,
      mutate: mutateSpy,
    });
  });
  test("renders without crashing", () => {
    render(<TodoList />);
  });

  test("renders loading while todo list is undefined", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      mutate: mutateSpy,
    });
    const { getByAltText } = render(<TodoList />);
    const loading = getByAltText("Loading");
    expect(loading).toBeInTheDocument();
  });

  test("renders an error message when there is an error", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: new Error("this is an error"),
      mutate: mutateSpy,
    });
    const { getByText } = render(<TodoList />);
    const error = getByText(/error/);
    expect(error).toBeInTheDocument();
  });

  test("can't submit blank todo", () => {
    const { getByPlaceholderText, getByText } = render(<TodoList />);
    const input = getByPlaceholderText("add todo");
    const submit = getByText("Submit");
    userEvent.type(input, "");
    userEvent.click(submit);
    expect(mutateSpy).toHaveBeenCalledTimes(0);
  });

  test("can submit valid todo", async () => {
    fetchWithToken.mockReturnValueOnce({
      id: 3,
      value: "new todo",
      done: false,
    });

    const { getByPlaceholderText, getByText } = render(<TodoList />);
    const input = getByPlaceholderText("add todo");
    const submit = getByText("Submit");
    userEvent.type(input, "new todo");
    userEvent.click(submit);
    await waitFor(() => expect(fetchWithToken).toHaveBeenCalledTimes(1));
    expect(mutateSpy).toHaveBeenCalledTimes(1);
  });
  test("can toggle existing todo", async () => {
    const { getAllByAltText } = render(<TodoList />);
    const todoCheckboxes = getAllByAltText("checkbox");
    userEvent.click(todoCheckboxes[0]);
    await waitFor(() => expect(fetchWithToken).toHaveBeenCalledTimes(1));
    expect(mutateSpy).toHaveBeenCalledTimes(1);
  });

  test("can delete a todo", async () => {
    const { getAllByText } = render(<TodoList />);
    const deleteButtons = getAllByText("Delete");
    userEvent.click(deleteButtons[0]);
    await waitFor(() => expect(fetchWithToken).toHaveBeenCalledTimes(1));
    expect(mutateSpy).toHaveBeenCalledTimes(1);
  });
});

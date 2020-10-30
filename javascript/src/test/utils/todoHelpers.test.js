import { sortTodos } from "main/utils/todoHelpers";

describe("todo helper tests", () => {
  test("sortTodo sorts todos by completion status then by value", () => {
    const initialOrder = [
      {
        value: "a",
        done: true,
      },
      {
        value: "b",
        done: false,
      },
      {
        value: "b",
        done: true,
      },
      {
        value: "a",
        done: false,
      },
    ];
    const expectedOrder = [
      {
        value: "a",
        done: false,
      },
      {
        value: "b",
        done: false,
      },
      {
        value: "a",
        done: true,
      },
      {
        value: "b",
        done: true,
      },
    ];
    expect(sortTodos(initialOrder)).toEqual(expectedOrder);
  });
});
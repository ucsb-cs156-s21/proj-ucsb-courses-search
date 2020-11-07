import { sortTodos, filterTodo } from "main/utils/todoHelpers";

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

  test("filterTodo does not remove incomplete todo when filtering by All", () => {
    const todo =  {
      value: "a",
      done: false,
    };
    const filter = "All";
    expect(filterTodo(todo, filter)).toEqual(true);
  });

  test("filterTodo does not remove complete todo when filtering by All", () => {
    const todo =  {
      value: "a",
      done: true,
    };
    const filter = "All";
    expect(filterTodo(todo, filter)).toEqual(true);
  });

  test("filterTodo removes incomplete todo when filtering by Complete", () => {
    const todo =  {
      value: "a",
      done: false,
    };
    const filter = "Complete";
    expect(filterTodo(todo, filter)).toEqual(false);
  });

  test("filterTodo does not remove complete todo when filtering by Complete", () => {
    const todo =  {
      value: "a",
      done: true,
    };
    const filter = "Complete";
    expect(filterTodo(todo, filter)).toEqual(true);
  });

  test("filterTodo does not remove incomplete todo when filtering by Incomplete", () => {
    const todo =  {
      value: "a",
      done: false,
    };
    const filter = "Incomplete";
    expect(filterTodo(todo, filter)).toEqual(true);
  });

  test("filterTodo removes complete todo when filtering by Incomplete", () => {
    const todo =  {
      value: "a",
      done: true,
    };
    const filter = "Incomplete";
    expect(filterTodo(todo, filter)).toEqual(false);
  });
});
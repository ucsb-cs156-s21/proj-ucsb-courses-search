export const sortTodos = (todos) => {
  return todos.sort((todoOne, todoTwo) => {
    if (todoOne.done !== todoTwo.done)
      return todoOne.done - todoTwo.done;
    return todoOne.value.localeCompare(todoTwo.value);
  });
}

export const filterTodo = (todo, filter) => {
  switch (filter) {
    case "Complete":
      return todo.done;
    case "Incomplete":
      return !todo.done;
    default:
      return true;
  }
}

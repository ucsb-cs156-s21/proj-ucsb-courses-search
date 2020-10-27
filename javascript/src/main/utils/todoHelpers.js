export const sortTodos = (todos) => {
  return todos.sort((todoOne, todoTwo) => {
    if (todoOne.done !== todoTwo.done)
      return todoOne.done - todoTwo.done;
    return todoOne.value.localeCompare(todoTwo.value);
  });
}
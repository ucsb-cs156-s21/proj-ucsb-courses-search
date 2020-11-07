import React, { useState } from "react";
import useSWR from "swr";
import { ListGroup } from "react-bootstrap";
import { TodoFilters } from "./TodoFilters";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { TodoHeader } from "./TodoHeader";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import { sortTodos, filterTodo } from "../../utils/todoHelpers";

const TodoList = () => {
  const { user, getAccessTokenSilently: getToken } = useAuth0();
  const { data: todoList, error, mutate: mutateTodos } = useSWR(
    ["/api/todos", getToken],
    fetchWithToken
  );
  const [filter, setFilter] = useState("All");
  if (error) {
    return (
      <h1>We encountered an error; please reload the page and try again.</h1>
    );
  }
  if (!todoList) {
    return <Loading />;
  }
  const updateTodo = async (item, id) => {
    await fetchWithToken(`/api/todos/${id}`, getToken, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(item),
    });
    await mutateTodos();
  };
  const deleteTodo = async (id) => {
    await fetchWithToken(`/api/todos/${id}`, getToken, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      noJSON: true,
    });
    await mutateTodos();
  };

  const saveTodo = async (todoText) => {
    await fetchWithToken(`/api/todos/`, getToken, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        value: todoText,
        done: false,
      }),
    });
    await mutateTodos();
  };
  var items = sortTodos(todoList).filter((todo) => filterTodo(todo, filter)).map((item, index) => {
    return (
      <TodoItem
        key={item.id}
        item={item}
        index={index}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    );
  });

  return (
    <>
      <TodoHeader name={user.name} />
      <TodoForm addTask={saveTodo} />
      <TodoFilters filter={filter} setFilter={setFilter} />
      <ListGroup> {items} </ListGroup>
    </>
  );
};

export default TodoList;

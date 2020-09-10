import React from "react";
import useSWR from "swr";
import { ListGroup } from "react-bootstrap";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { TodoHeader } from "./TodoHeader";
import { fetchWithToken } from "../../utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading";
import { v4 } from "uuid";

const TodoList = () => {
  const { user, getAccessTokenSilently: getToken } = useAuth0();
  const { data: todoList, error, mutate: mutateTodos } = useSWR(
    ["/api/todos", getToken],
    fetchWithToken
  );
  if (error) {
    return (
      <h1>We encountered an error; please reload the page and try again.</h1>
    );
  }
  if (!todoList) {
    return <Loading />;
  }
  const toggleTodo = async (index, id) => {
    await fetchWithToken(`/api/todos/${id}`, getToken, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      noJSON: true,
    });
    await mutateTodos();
  };
  const deleteTodo = async (index, id) => {
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
  var items = todoList.map((item, index) => {
    return (
      <TodoItem
        key={index}
        item={item}
        index={index}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    );
  });

  return (
    <>
      <TodoHeader name={user.name} />
      <TodoForm addTask={saveTodo} />
      <ListGroup> {items} </ListGroup>
    </>
  );
};

export default TodoList;

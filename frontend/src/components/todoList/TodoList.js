import React from "react";
import useSWR, { mutate } from "swr";
import { ListGroup } from "react-bootstrap";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { TodoHeader } from "./TodoHeader";
import { fetchWithToken } from "../../utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading";

const TodoList = () => {
  const { user, getAccessTokenSilently: getToken } = useAuth0();
  const { data: todoList, error } = useSWR(
    () => ["/api/todos", getToken],
    fetchWithToken
  );
  if (!todoList) {
    return <Loading />;
  }
  if (error) {
    console.error(error);
    return <h1>We encountered an error; check the console for details.</h1>;
  }
  const toggleTodo = async (index, id) => {
    mutate(["/api/todos", getToken], async (todos) => {
      await fetchWithToken(`/api/todos/${id}`, getToken, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        noJSON: true,
      });
      todos[index].done = !todos[index].done;
      return [...todos];
    });
  };
  const deleteTodo = async (index, id) => {
    mutate(["/api/todos", getToken], async (todos) => {
      await fetchWithToken(`/api/todos/${id}`, getToken, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        noJSON: true,
      });
      return todos.filter((_, arrayIndex) => arrayIndex !== index);
    });
  };

  const saveTodo = async (todoText) => {
    const trimmedTodoText = todoText.trim();
    if (trimmedTodoText.length > 0) {
      mutate(["/api/todos", getToken], async (todos) => {
        const newTodo = await fetchWithToken(`/api/todos/`, getToken, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            value: trimmedTodoText,
            done: false,
          }),
        });
        return [...(todos || []), newTodo];
      });
    }
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
      <TodoHeader user={{ name: user.name }} />
      <TodoForm addTask={saveTodo} />
      <ListGroup> {items} </ListGroup>
    </>
  );
};

export default TodoList;

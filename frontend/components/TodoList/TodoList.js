import React, { useState } from "react";
import useSWR, { mutate, fetcher } from "swr";
import { ListGroup, Button } from "react-bootstrap";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { TodoHeader } from "./TodoHeader";
import { fetchWithToken } from "../../utils/fetch";
import { useAuth } from "react-use-auth";
import Spinner from "react-bootstrap/Spinner";

export function TodoList() {
  const { authResult } = useAuth();
  const { data: todoList } = useSWR(
    () => ["/api/todos", authResult.accessToken],
    fetchWithToken
  );
  if (!todoList) {
    return <Spinner animation="border" />;
  }
  console.log(todoList);
  const toggleTodo = (index, id) => {
    mutate(["/api/todos", authResult.accessToken], async todos => {
      await fetchWithToken(`/api/todos/${id}`, authResult.accessToken, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        noJSON: true
      });
      todos[index].done = !todos[index].done;
      return [...todos];
    });
  };
  const deleteTodo = (index, id) => {
    mutate(["/api/todos", authResult.accessToken], async todos => {
      await fetchWithToken(`/api/todos/${id}`, authResult.accessToken, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        },
        noJSON: true
      });
      return todos.filter((_, arrayIndex) => arrayIndex !== index);
    });
  };

  const saveTodo = todoText => {
    const trimmedTodoText = todoText.trim();

    if (trimmedTodoText.length > 0) {
      mutate(["/api/todos", authResult.accessToken], async todos => {
        const newTodo = await fetchWithToken(
          `/api/todos/`,
          authResult.accessToken,
          {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              value: trimmedTodoText,
              // userId: null,
              // id: null,
              done: false
            })
          }
        );
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
      <TodoHeader user={{ name: "Scott" }} />
      <TodoForm addTask={saveTodo} />
      <ListGroup> {items} </ListGroup>
    </>
  );
}

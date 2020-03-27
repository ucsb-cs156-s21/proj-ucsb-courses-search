import React, { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { TodoHeader } from "./TodoHeader";

export function TodoList() {
  const [todoList, setTodos] = useState([]);
  const toggleTodo = index => {
    const updatedTodoList = [...todoList];
    updatedTodoList[index].done = !updatedTodoList[index].done;
    setTodos(updatedTodoList);
  };
  const deleteTodo = index => {
    const newTodoList = todoList.filter(
      (_, arrayIndex) => arrayIndex !== index
    );
    setTodos(newTodoList);
  };

  const saveTodo = todoText => {
    const trimmedTodoText = todoText.trim();

    if (trimmedTodoText.length > 0) {
      setTodos([
        ...todoList,
        { id: todoList.length, value: trimmedTodoText, done: false }
      ]);
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

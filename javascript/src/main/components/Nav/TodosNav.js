import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TodosButton from "./TodosButton";

const TodosNav = () => {
  const { isAuthenticated } = useAuth0();
  return <>{isAuthenticated ? <TodosButton /> : null}</>;
};

export default TodosNav;

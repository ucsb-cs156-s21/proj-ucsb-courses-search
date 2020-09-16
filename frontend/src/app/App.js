import React from "react";
import "./App.css";
import AppNavbar from "../components/Nav/AppNavbar";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading/Loading";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import AppFooter from "../components/Footer/AppFooter";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "../components/Auth/PrivateRoute";
import TodoList from "../pages/Todos/Todos";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <AppNavbar />
      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/todos" component={TodoList} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </Container>
      <AppFooter />
    </div>
  );
}

export default App;

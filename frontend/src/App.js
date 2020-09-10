import React from "react";
import "./App.css";
import AppNavbar from "./components/nav/AppNavbar";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./components/Loading";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import AppFooter from "./components/AppFooter";
import Home from "./components/Home";
import Todos from "./components/Todos";
import Profile from "./components/Profile";
import PrivateRoute from "./components/auth0/PrivateRoute";

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
          <PrivateRoute path="/todos" component={Todos} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </Container>
      <AppFooter />
    </div>
  );
}

export default App;

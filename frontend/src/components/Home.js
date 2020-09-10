import React from "react";
import { Jumbotron } from "react-bootstrap";
const Home = () => {
  return (
    <Jumbotron>
      <h1>This is 127.0.0.1 (aka home)</h1>
      <div className="text-left">
        <p>Welcome to the Demo Spring React App!</p>
        <p>
          This app can hopefully help you understand how to use React with
          Spring in order to create a functional web application. This app is
          primarily built using the following:
        </p>
        <ul>
          <li>
            <a href="https://github.com/facebook/create-react-app">
              Create React App
            </a>{" "}
            - used for creating the React frontend from scratch
          </li>
          <li>
            <a href="https://start.spring.io/">Spring Boot Initializer</a> -
            used for creating the Spring Boot backend
          </li>
        </ul>
      </div>
    </Jumbotron>
  );
};

export default Home;

import React from "react";
import { Jumbotron } from "react-bootstrap";
const About = () => {
  return (
    <Jumbotron>
      <h1>This is 127.0.0.1 (aka home)</h1>
      <div className="text-left">
        <p>
          This web application is a class project of
          CMPSC 156 
          at 
          UC Santa Barbara. The main function of this app is to allow users to search specific classes 
          arranged based on the following inputs: quarter, department and course level. Users will find
          a list of classes suited to their desires in order of course number from least to greatest. For each course, users will see 
          the course name, professor name, enroll code, times and unit number along with a list of sections.
          This app is primarily built using the following:
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

export default About;

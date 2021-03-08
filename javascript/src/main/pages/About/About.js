import React from "react";
import { Jumbotron } from "react-bootstrap";
const About = () => {
  return (
    <Jumbotron>
      <h1>About Us</h1>
      <div className="text-left">
        <p>
        This web application is a class project of CMPSC 156 at 
          UC Santa Barbara. The main function of this app is to allow users to search specific classes 
          arranged based on the following inputs: quarter, department and course level. 
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
        <h2>Purpose</h2>
        <p>
          As the name implies, the application helps students search for courses to develop a class schedule. Likewise it is also used for 
          the purpose of helping CS156 students learn about legacy code.
        </p>
        <h2>Features</h2>
        <p>This application features four course search types: Basic Search, Search By Course Name, GE Search and Search By Instructor. Users will find
          a list of classes suited to their desires in order of course number from least to greatest. For each course, users will see 
          the course name, professor name, enroll code, times and unit number along with a list of sections.
          Lists of statistics for each class will give course occupancy from previous quarters as well as average class size.
        </p>
        <h2>Team</h2>
        <p>
          This application is maintained by CS156 at UC Santa Barbara. Work done to the application
          can be found below:
        </p>
        <ul>
          <li>
            <a href="https://github.com/ucsb-cs156-w21/proj-ucsb-courses-search">
              Github Page
            </a>{" "}
            - used for uploading new updates to the application
          </li>
        </ul>
      </div>
    </Jumbotron>
  );
};

export default About;

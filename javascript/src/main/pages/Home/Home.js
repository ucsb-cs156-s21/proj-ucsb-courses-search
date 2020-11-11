import React from "react";
import { Jumbotron } from "react-bootstrap";
import {useAuth0} from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";
import BasicCourseSearchForm from "../../components/BasicCourseSearch/BasicCourseSearchForm";

const Home = () => {
    const { isAuthenticated } = useAuth0();

    return (
            <Jumbotron>
                <div className="text-left">
                    <h5>Welcome to the UCSB Courses Search App!</h5>
                    <BasicCourseSearchForm />
                </div>
            </Jumbotron>
    );
};

export default Home;

import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";
import BasicCourseSearchForm from "../../components/BasicCourseSearch/BasicCourseSearchForm";
import JSONPrettyPanel from "../../components/Utilities/JSONPrettyPanel";

const Home = () => {
    const { isAuthenticated } = useAuth0();

    // const [courseJSON, setCourseJSON] = useState("");
    // setCourseJSON('{"course" : "cs156"}');
    const courseJSON = '{"course" : "cs156"}';
    return (
        <Jumbotron>
            <div className="text-left">
                <h5>Welcome to the UCSB Courses Search App!</h5>
                <BasicCourseSearchForm />
                <JSONPrettyPanel
                    expression={"courseJSON"}
                    value={courseJSON}
                />
            </div>
        </Jumbotron>
    );
};

export default Home;

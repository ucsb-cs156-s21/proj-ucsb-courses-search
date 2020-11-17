import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import BasicCourseSearchForm from "../../components/BasicCourseSearch/BasicCourseSearchForm";
import BasicCourseTable from "../../components/BasicCourseSearch/BasicCourseTable";
import JSONPrettyCard from "../../components/Utilities/JSONPrettyCard";

const Home = () => {

    // every function that starts with "use" is a hook
    // e.g. useState, useSWR, useAuth0

    // courseJSON is the variable for the state
    // setCourseJSON is the setter
    // the parameter to useState is the initial value of the state

    const initialCourseJSON = {
        "pageNumber": 1,
        "pageSize": 1,
        "total": 0,
        "classes": []
    };

    const [courseJSON, setCourseJSON] = useState(initialCourseJSON);

    return (
        <Jumbotron>
            <div className="text-left">
                <h5>Welcome to the UCSB Courses Search App!</h5>
                <BasicCourseSearchForm setCourseJSON={setCourseJSON} />
                <BasicCourseTable classes={courseJSON.classes} />
                <JSONPrettyCard
                    expression={"courseJSON"}
                    value={courseJSON}
                />
            </div>
        </Jumbotron>
    );
};

export default Home;
import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";

import GeCourseSearchForm from "main/components/BasicCourseSearch/GeCourseSearchForm";
import JSONPrettyCard from "main/components/Utilities/JSONPrettyCard";
import {  fetchBasicCourseHistoryJSON } from "main/services/courseSearches";

const Ge = () => {

    // every function that starts with "use" is a hook
    // e.g. useState, useSWR, useAuth0

    // courseJSON is the variable for the state
    // setCourseJSON is the setter
    // the parameter to useState is the initial value of the state

    const [courseJSON, setCourseJSON] = useState('{"course" : "cs148"}');

    // const courseJSON = '{"course" : "cs156"}';
    return (
        <Jumbotron>
            <div className="text-left">
                <h2>Search Archived Course Data from MongoDB</h2>
                <h5>Search GE Through Various Quarters</h5>
                <GeCourseSearchForm setCourseJSON={setCourseJSON} fetchJSON={fetchBasicCourseHistoryJSON} />
                <JSONPrettyCard
                    expression={"courseJSON"}
                    value={courseJSON}
                />
            </div>
        </Jumbotron>
    );
};

export default Ge;

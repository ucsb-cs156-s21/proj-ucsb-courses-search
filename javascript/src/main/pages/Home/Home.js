import React from "react";
import { Jumbotron } from "react-bootstrap";
import {useAuth0} from "@auth0/auth0-react";
import Redirect from "react-router-dom/es/Redirect";


const Home = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <>{isAuthenticated ? <Redirect to="/todos"/> :
            <Jumbotron>
                <h1>Not Logged In</h1>
                <div className="text-left">
                    <h5>Welcome to the Demo Spring React App!</h5>
                    <h5>
                        To access the todos, please log in!
                    </h5>
                </div>
            </Jumbotron>}</>
    );
};

export default Home;

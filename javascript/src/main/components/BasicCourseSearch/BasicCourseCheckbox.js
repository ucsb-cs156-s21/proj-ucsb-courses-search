import React, { useState } from "react";
import { Form} from "react-bootstrap";


const BasicCourseCheckbox = ({ parentCallback }) => {

    const [cancelled, setCancelledChecked] = useState(false);
    const [closed, setClosedChecked] = useState(false);
    const [full, setFullChecked] = useState(false); 

    const handleCancelledOnChange = (event) => {
        setCancelledChecked(!cancelled);
    };

    const handleClosedOnChange = (event) => {
        setClosedChecked(!closed);
    };

    const handleFullOnChange = (event) => {
        setFullChecked(!full);
    };
    
    parentCallback(cancelled,closed,full)
 
    return (
        <Form >
            <Form.Label>Hide: </Form.Label>
            {/* <Form.Group controlId="BasicSearch.Cancelled"> */}
                <Form.Check type="checkbox" label="Cancelled" value={cancelled} onChange={handleCancelledOnChange}/>
            {/* </Form.Group> */}
            {/* <Form.Group controlId="BasicSearch.Closed"> */}
                {/* <Form.Label>Closed</Form.Label> */}
                <Form.Check type="checkbox"  label="Closed" value={closed} onChange={handleClosedOnChange}/>
            {/* </Form.Group>
            <Form.Group controlId="BasicSearch.Full"> */}
                {/* <Form.Label>Full</Form.Label> */}
                <Form.Check type="checkbox" label="Full" value={full} onChange={handleFullOnChange}/>
            {/* </Form.Group> */}
        </Form>
    );
};

export default BasicCourseCheckbox;

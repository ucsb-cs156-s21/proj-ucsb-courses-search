import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { quarterRange } from "main/utils/quarterUtilities";
import SelectQuarter from "main/components/BasicCourseSearch/SelectQuarter";

const CourseSearchFormQtrDeptOnly = ({ setCourseJSON, fetchJSON }) => {
    const localSearchQuarter = localStorage.getItem("BasicSearchQtrDept.Quarter");
    const localSearchDept = localStorage.getItem("BasicSearchQtrDept.Department");

	const quarters = quarterRange("20084", "20213");
	const [quarter, setQuarter] = useState(localSearchQuarter || quarters[0].yyyyq);
	const [department, setDepartment] = useState(localSearchDept || "CMPSC");
	const { addToast } = useToasts();

	const handleSubmit = (event) => {
		event.preventDefault();
		fetchJSON(event, { quarter, department }).then((courseJSON) => {
			if (courseJSON.total === 0) {
				addToast("There are no courses that match the requested criteria.", {
					appearance: "error",
				});
			}
			setCourseJSON(courseJSON);
		});
	};

	const handleDepartmentOnChange = (event) => {
        localStorage.setItem("BasicSearchQtrDept.Department", event.target.value);
		setDepartment(event.target.value);
	};
    
    const handleQuarterOnChange = (quarter) => {
        localStorage.setItem("BasicSearchQtrDept.Quarter", quarter);
        setQuarter(quarter);
    };

	return (
		<Form onSubmit={handleSubmit}>
			<SelectQuarter
				quarters={quarters}
				quarter={quarter}
				setQuarter={handleQuarterOnChange}
				controlId={"BasicSearch.Quarter"}
				label={"Quarter"}
			/>
			<Form.Group controlId="BasicSearch.Department">
				<Form.Label>Department</Form.Label>
				<Form.Control
					as="select"
					onChange={handleDepartmentOnChange}
					value={department}
				>
					<option>CMPSC</option>
					<option>MATH</option>
				</Form.Control>
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};

export default CourseSearchFormQtrDeptOnly;

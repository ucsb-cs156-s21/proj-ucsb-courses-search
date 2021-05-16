import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { quarterRange } from "main/utils/quarterUtilities";
import SelectQuarter from "main/components/BasicCourseSearch/SelectQuarter";

const CourseSearchFormQtrDeptOnly = ({ setCourseJSON, fetchJSON }) => {
	const quarters = quarterRange("20081", "20211");
	const [quarter, setQuarter] = useState("20212");
	const [department, setDepartment] = useState("CMPSC");
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

	const handleQuarterOnChange = (event) => {
		setQuarter(event.target.value);
	};

	const handleDepartmentOnChange = (event) => {
		setDepartment(event.target.value);
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

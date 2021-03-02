import React from 'react';
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CourseFilters from "main/components/BasicCourseSearch/CourseFilters";


describe("CourseFilters tests", () => {

    const cancelled = false;
    const handleCancelledOnChange = jest.fn();
    const closed = false;
    const handleClosedOnChange= jest.fn();
    const full = false;
    const handleFullOnChange = jest.fn();

    test("renders without crashing", () => {
        render(<CourseFilters cancelled={cancelled} handleCancelledOnChange={handleCancelledOnChange} closed={closed} handleClosedOnChange={handleClosedOnChange} full={full} handleFullOnChange={handleFullOnChange} />);
    });

    
    // test("when I select an object, the value changes", () => {
    //     const {getByLabelText} = render(<CourseFilters subjects={subjectFixtures.allTheSubjects} subject={subject} setSubject={setSubject} />);
    //     const CourseFilters = getByLabelText("Subject Area")
    //     userEvent.selectOptions(CourseFilters, "CMPSC");
    //     expect(setSubject).toBeCalledWith("CMPSC");
    // });
    
});
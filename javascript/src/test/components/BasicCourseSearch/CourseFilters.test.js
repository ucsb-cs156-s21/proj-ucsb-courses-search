import React from 'react';
import { render } from "@testing-library/react";
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
    
});

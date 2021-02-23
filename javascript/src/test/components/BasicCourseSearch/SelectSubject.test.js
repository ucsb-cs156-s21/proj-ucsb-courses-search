import React from 'react';
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectSubject from "main/components/BasicCourseSearch/SelectSubject";

import * as subjectFixtures from "main/fixtures/Courses/subjectFixtures.js"


describe("SelectSubject tests", () => {

    const subject = jest.fn();
    const setSubject = jest.fn();

    test("renders without crashing on zero subjects", () => {
        render(<SelectSubject subjects={[]} subject={subject} setSubject={setSubject} />);
    });

    test("renders without crashing on one subjects", () => {
        render(<SelectSubject subjects={subjectFixtures.oneSubject} subject={subject} setSubject={setSubject} />);
    });

    test("renders without crashing on three subjects", () => {
        render(<SelectSubject subjects={subjectFixtures.threeSubjects} subject={subject} setSubject={setSubject} />);
    });

    test("renders without crashing on many subjects", () => {
        render(<SelectSubject subjects={subjectFixtures.allTheSubjects} subject={subject} setSubject={setSubject} />);
    });

    test("when I select an object, the value changes", () => {
        const {getByLabelText} = render(<SelectSubject subjects={subjectFixtures.allTheSubjects} subject={subject} setSubject={setSubject} />);
        const selectSubject = getByLabelText("Subject Area")
        userEvent.selectOptions(selectSubject, "CMPSC");
        expect(setSubject).toBeCalledWith("CMPSC");
    });
    
});
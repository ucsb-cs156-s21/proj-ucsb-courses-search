import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectSubject from "main/components/BasicCourseSearch/SelectSubject";

import * as subjectFixtures from "main/fixtures/Courses/subjectFixtures.js"


describe("SelectSubject tests", () => {

    test("renders without crashing on zero subjects", () => {
        render(<SelectSubject subjects={[]} />);
    });

    test("renders without crashing on one subjects", () => {
        render(<SelectSubject subjects={subjectFixtures.oneSubject} />);
    });

    test("renders without crashing on three subjects", () => {
        render(<SelectSubject subjects={subjectFixtures.threeSubjects} />);
    });

    test("renders without crashing on many subjects", () => {
        render(<SelectSubject subjects={subjectFixtures.allTheSubjects} />);
    });

    test("when I select an object, the value changes", () => {
        const {getByLabelText} = render(<SelectSubject subjects={subjectFixtures.allTheSubjects} />);
        const selectSubject =getByLabelText("Subject Area")
        userEvent.selectOptions(selectSubject, "CMPSC");
        expect(selectSubject.value).toBe("CMPSC");
    });
    
});
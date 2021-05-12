import React from 'react';

import CourseSearchFormInstructor from "main/components/BasicCourseSearch/CourseSearchFormInstructor";
import { ToastProvider } from 'react-toast-notifications'

export default {
    title: 'components/BasicCourseSearch/CourseSearchFormInstructor',
    component: CourseSearchFormInstructor
};

const initialJSON = {
    "pageNumber": 1,
    "pageSize": 1,
    "total": 0,
    "classes": []
};

const setCourseJsonStandin = () => { return initialJSON; };
const fetchJSONStandin = () => Promise.resolve( initialJSON );

const Template = (_args) => {
    return (
        <ToastProvider>
            <CourseSearchFormInstructor setCourseJson={setCourseJsonStandin} fetchJSON={fetchJSONStandin} />
        </ToastProvider>
    )
};
export const Empty = Template.bind({});
Empty._args = {};


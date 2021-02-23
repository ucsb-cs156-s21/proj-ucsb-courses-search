import React from 'react';

import BasicCourseSearchForm from "main/components/BasicCourseSearch/BasicCourseSearchForm";
import * as courseFixtures from "main/fixtures/Courses/courseFixtures.js"

export default {
  title: 'components/BasicCourseSearch/BasicCourseSearchForm',
  component: BasicCourseSearchForm
};

const initialJSON = {
    "pageNumber": 1,
    "pageSize": 1,
    "total": 0,
    "classes": []
};

const setCourseJsonStandin = () => { return initialJSON; };
const fetchJSONStandin = () => Promise.resolve();

const Template = (args) => <BasicCourseSearchForm setCourseJson={setCourseJsonStandin} fetchJSON={fetchJSONStandin} />;

export const Empty = Template.bind({});
Empty.args = {
 classes : []
};


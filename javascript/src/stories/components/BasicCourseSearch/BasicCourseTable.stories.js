import React from 'react';

import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";
import * as courseFixtures from "main/fixtures/Courses/courseFixtures.js"

export default {
  title: 'components/BasicCourseSearch/BasicCourseTable',
  component: BasicCourseTable
};

const Template = (args) => <BasicCourseTable {...args} />;

export const Empty = Template.bind({});
Empty.args = {
 classes : []
};


export const classesLectureAndSections = Template.bind({});
classesLectureAndSections.args = {
 classes : courseFixtures.classesLectureAndSections
};

export const classesLectureOnly = Template.bind({});
classesLectureOnly.args = {
 classes : courseFixtures.classesLectureOnly
};

export const classesSectionOnly = Template.bind({});
classesSectionOnly.args = {
 classes : courseFixtures.classesSectionOnly
};

export const classesSectionOnlyTBD = Template.bind({});
classesSectionOnlyTBD.args = {
 classes : courseFixtures.classesSectionOnlyTBD
};

export const classesLectureOnlyTimeDaysTBD = Template.bind({});
classesLectureOnlyTimeDaysTBD.args = {
 classes : courseFixtures.classesLectureOnlyTimeDaysTBD
};


export const classesSectionOnlyTimeDaysTBD = Template.bind({});
classesSectionOnlyTimeDaysTBD.args = {
 classes : courseFixtures.classesSectionOnlyTimeDaysTBD
};



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
 classes : courseFixtures.classesLectureAndSections,
 checks : [false,false,false]
};

export const classesLectureOnly = Template.bind({});
classesLectureOnly.args = {
 classes : courseFixtures.classesLectureOnly,
 checks : [true,true,true]
};

export const classesSectionOnly = Template.bind({});
classesSectionOnly.args = {
 classes : courseFixtures.classesSectionOnly,
 checks : [true,true,true]
};

export const classesSectionOnlyTBD = Template.bind({});
classesSectionOnlyTBD.args = {
 classes : courseFixtures.classesSectionOnlyTBD,
 checks : [true,true,true]
};

export const classesLectureOnlyTimeDaysTBD = Template.bind({});
classesLectureOnlyTimeDaysTBD.args = {
 classes : courseFixtures.classesLectureOnlyTimeDaysTBD,
 checks : [true,true,true]
};


export const classesSectionOnlyTimeDaysTBD = Template.bind({});
classesSectionOnlyTimeDaysTBD.args = {
 classes : courseFixtures.classesSectionOnlyTimeDaysTBD,
 checks : [true,true,true]
};



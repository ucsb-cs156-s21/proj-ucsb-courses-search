import React, { useState } from 'react';

import SelectSubject from "main/components/BasicCourseSearch/SelectSubject";

import * as subjectFixtures from "main/fixtures/Courses/subjectFixtures.js"

export default {
  title: 'components/BasicCourseSearch/SelectSubject',
  component: SelectSubject
};

const Template = (args) => {
  const [subject, setSubject] = useState("ANTH");

  return (
    < SelectSubject setSubject={setSubject} subject={subject} {...args} />
  )
};


export const OneSubject = Template.bind({});
OneSubject.args = {
  subjects: subjectFixtures.oneSubject
};

export const ThreeSubjects = Template.bind({});
ThreeSubjects.args = {
  subjects: subjectFixtures.threeSubjects
};

export const AllTheSubjects = Template.bind({});
AllTheSubjects.args = {
  subjects: subjectFixtures.allTheSubjects,
};

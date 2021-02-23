import React from 'react';

import SelectDepartment from "main/components/BasicCourseSearch/SelectDepartment";

export default {
  title: 'components/BasicCourseSearch/SelectDepartment',
  component: SelectDepartment
};

const setDepartment = (dept) => { 
    console.log("setDepartment called with parameter:" + dept);
}

const Template = (args) => <SelectDepartment setDepartment={setDepartment} {...args} />;


export const JustMath = Template.bind({});
JustMath.args = {
 departments : [ {deptCode: "MATH"} ],
 department: "MATH"
};

export const CMPSC_MATH_ECE = Template.bind({});
CMPSC_MATH_ECE.args = {
 departments : [ {deptCode: "MATH"}, {deptCode: "CMPSC"}, {deptCode: "ECE"}],
 department: "CMPSC"
};


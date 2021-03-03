import React from 'react';

import CourseFilters from "main/components/BasicCourseSearch/CourseFilters";
export default {
  title: 'components/BasicCourseSearch/CourseFilters',
  component: CourseFilters
};


const Template = (args) => <CourseFilters {...args} />;


export const AllUnchecked = Template.bind({});
AllUnchecked.args = {
    cancelled:false,
    handleCancelledOnChange: ()=>{},
    closed:false,
    handleClosedOnChange: ()=>{},
    full:false,
    handleFullOnChange: ()=>{}
};


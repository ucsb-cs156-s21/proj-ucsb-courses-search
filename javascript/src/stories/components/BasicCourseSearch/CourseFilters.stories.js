import React from 'react';

import CourseFilters from "main/components/BasicCourseSearch/CourseFilters";
export default {
  title: 'components/BasicCourseSearch/CourseFilters',
  component: CourseFilters
};



const Template = (args) => <CourseFilters {...args} />;

//const Template = (_args) => <CourseFilters cancelled={cancelled} handleCancelledOnChange={handleCancelledOnChange} closed={closed} handleClosedOnChange={handleClosedOnChange} full={full} handleFullOnChange={handleFullOnChange} />;

export const AllUnchecked = Template.bind({});
AllUnchecked.args = {
    cancelled:false,
    handleCancelledOnChange: ()=>{},
    closed:false,
    handleClosedOnChange: ()=>{},
    full:false,
    handleFullOnChange: ()=>{}
};


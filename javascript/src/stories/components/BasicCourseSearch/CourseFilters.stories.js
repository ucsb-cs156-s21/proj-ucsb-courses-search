import React from "react";

import CourseFilters from "main/components/BasicCourseSearch/CourseFilters";
export default {
  title: "components/BasicCourseSearch/CourseFilters",
  component: CourseFilters,
  argTypes: {
    handleCancelledOnChange: { action: "call handleCancelledOnChange" },
    handleClosedOnChange: { action: "call handleClosedOnChange" },
    handleFullOnChange: { action: "call handleFullOnChange" },
  },
};

const Template = (args) => <CourseFilters {...args} />;

export const AllUnchecked = Template.bind({});
AllUnchecked.args = {};

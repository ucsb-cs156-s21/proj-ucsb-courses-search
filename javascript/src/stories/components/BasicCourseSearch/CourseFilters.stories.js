import React from 'react';
import { action } from '@storybook/addon-actions';
import { configureActions } from '@storybook/addon-actions';

import CourseFilters from "main/components/BasicCourseSearch/CourseFilters";
export default {
  title: 'components/BasicCourseSearch/CourseFilters',
  component: CourseFilters,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};
configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const Template = (args) => <CourseFilters {...args} />;


export const AllUnchecked = Template.bind({});
AllUnchecked.args = {
    cancelled:false,
    handleCancelledOnChange: () => {action('Cancelled button click!',{
      depth: 5,
    })},
    closed:false,
    handleClosedOnChange: ()=>{action('Close button click!',{
      depth: 5,
    })},
    full:false,
    handleFullOnChange: ()=>{action('Full button click!',{
      depth: 5,
    })}
};


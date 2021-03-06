import React, { useState } from 'react';
import { action } from "@storybook/addon-actions";

import CourseFilters from "main/components/BasicCourseSearch/CourseFilters";
export default {
  title: 'components/BasicCourseSearch/CourseFilters',
  component: CourseFilters,
};

const Template = (_args) => {
  const [closed, setClosed] = useState(false);
  const [full, setFull] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const toggleIt = (stateVar, setStateVar, label) => {
    const newValue = !stateVar
    console.log(`toggling ${label} from ${stateVar} to ${newValue}`);
    action(`toggling ${label} from ${stateVar} to ${newValue}`);
    setStateVar(newValue);
  }
  
  return (
    <CourseFilters 
      cancelled={cancelled}
      handleCancelledOnChange={()=>toggleIt(cancelled,setCancelled,"cancelled")}
      full={full}
      handleFullOnChange={()=>toggleIt(full,setFull,"full")}
      closed={closed}
      handleClosedOnChange={()=>toggleIt(closed,setClosed,"closed")}
      {..._args}
       />
  );
}

export const AllUnchecked = Template.bind({});
AllUnchecked._args = {
};


import React, { useState } from 'react';

import SelectQuarter from "main/components/BasicCourseSearch/SelectQuarter";

import { quarterRange } from '../../../main/utils/quarterUtilities';

export default {
    title: 'components/BasicCourseSearch/SelectQuarter',
    component: SelectQuarter
};

const Template = (args) => {
    const [quarter, setQuarter] = useState(args.quarters[0]);

    return (
        < SelectQuarter 
        quarter={quarter} 
        setQuarter={setQuarter} 
        controlId={"SampleControlId"}
        label={"Quarter"} 
        {...args} />
    )
};


export const OneQuarter = Template.bind({});
OneQuarter.args = {
    quarters: quarterRange("20211", "20211")
};

export const ThreeQuarters = Template.bind({});
ThreeQuarters.args = {
    quarters: quarterRange("20204", "20212")
};

export const ManyQuarters = Template.bind({});
ManyQuarters.args = {
    quarters: quarterRange("20081", "20213")
};

import React from "react";
import { useState } from "react";
import JSONPrettyCard from "main/components/Utilities/JSONPrettyCard";
import * as JSONPrettyCardFixtures from "main/fixtures/Utilities/JSONPrettyCardFixtures.js";

export default {
    title: 'components/Utilities/JSONPrettyCard',
    component: JSONPrettyCard
  };


const Template = (args) => {
  const [courseJSON, setCourseJSON] = useState('{"course" : "cs148"}');

  return(
    <JSONPrettyCard setCourseJSON={setCourseJSON} courseJSON={courseJSON} {...args} />
  )
};


export const JSON_pretty_card = Template.bind({});
JSON_pretty_card.args = {
  courseJSON: JSONPrettyCardFixtures.oneSubject
};
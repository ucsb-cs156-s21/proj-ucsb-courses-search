import React from 'react';

import BasicCourseSearchForm from "main/components/BasicCourseSearch/BasicCourseSearchForm";

import { ToastProvider } from 'react-toast-notifications'

export default {
  title: 'components/BasicCourseSearch/BasicCourseSearchForm',
  component: BasicCourseSearchForm
};

const initialJSON = {
    "pageNumber": 1,
    "pageSize": 1,
    "total": 0,
    "classes": []
};

const setCourseJsonStandin = () => { return initialJSON; };
const fetchJSONStandin = () => Promise.resolve();

const Template = (_args) => {
  return(
    <ToastProvider>
      <BasicCourseSearchForm setCourseJson={setCourseJsonStandin} fetchJSON={fetchJSONStandin} />
    </ToastProvider>
  )
}

export const Empty = Template.bind({});
Empty._args = {};


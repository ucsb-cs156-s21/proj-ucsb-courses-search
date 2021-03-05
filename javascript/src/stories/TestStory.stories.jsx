import React from "react";
import { action } from "@storybook/addon-actions";

const TestComponent = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default {
  title: "Buttons",
  component: TestComponent,
};

export const ActionButtonTest = () => {
  return (
    <TestComponent onClick={() => action(`button click`)()}>
      Action Button
    </TestComponent>
  );
};

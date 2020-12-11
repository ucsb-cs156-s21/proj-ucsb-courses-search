import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ScheduleButton from "./ScheduleButton";

const ScheduleNav = () => {
  const { isAuthenticated } = useAuth0();
  return <>{isAuthenticated ? <ScheduleButton /> : null}</>;
};

export default ScheduleNav;

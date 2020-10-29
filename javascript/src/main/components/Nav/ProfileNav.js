import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileButton from "./ProfileButton";

const ProfileNav = () => {
  const { isAuthenticated } = useAuth0();
  return <>{isAuthenticated ? <ProfileButton /> : null}</>;
};

export default ProfileNav;

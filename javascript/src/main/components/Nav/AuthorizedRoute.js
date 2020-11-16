import React from "react";
import { Route } from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import useSWR from "swr";
import {fetchWithToken} from "main/utils/fetch";
import Loading from "main/components/Loading/Loading";

const AuthorizedRoute = ({component, authorizedRoles, ...args}) => {
  const { isLoading, getAccessTokenSilently: getToken } = useAuth0();
  const { data: roleInfo } = useSWR(
    ["/api/myRole", getToken],
    fetchWithToken
  );
  const isAuthorized = roleInfo && authorizedRoles.includes(roleInfo.role.toLowerCase());

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Route component={isAuthorized ? component : null} {...args} />
  );
}

export default AuthorizedRoute; 
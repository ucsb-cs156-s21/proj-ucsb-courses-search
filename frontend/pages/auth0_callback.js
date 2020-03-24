import { useEffect } from "react";
import { useAuth } from "react-use-auth";

function Auth0CallbackPage() {
  const { handleAuthentication } = useAuth();

  useEffect(() => {
    handleAuthentication();
  }, []);

  return null;
}

export default Auth0CallbackPage;

import { useAuth } from "react-use-auth";
import Button from "react-bootstrap/Button";

function AuthenticatedContent(props) {
  const { isAuthenticated, login } = useAuth();

  if (!isAuthenticated()) {
    return (
        <div>
          <p>
            You must log in to view this content.
          </p>
          <Button onClick={login}>Login</Button>
        </div>
    )
  }

  return (
      <>
        {props.children}
      </>
  )
}

export default AuthenticatedContent;

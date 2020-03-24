import Container from "react-bootstrap/Container";
import AppNavbar from "./AppNavbar";
import AppFooter from "./AppFooter";

function Layout(props) {
  return (
      <>
        <AppNavbar />
        <Container>
          {props.children}
        </Container>
        <AppFooter />
      </>
  );
}

export default Layout;

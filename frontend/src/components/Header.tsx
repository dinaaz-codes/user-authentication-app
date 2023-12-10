import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="#home">
          <img
            data-testid="logo-id"
            alt="easy-generator logo"
            src="https://seeklogo.com/images/E/easygenerator-logo-83CFFDE4DB-seeklogo.com.png"
            width="150"
            height="40"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;

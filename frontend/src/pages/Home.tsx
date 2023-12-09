import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import SignUpForm from "../components/SignUpForm";

const Home = () => {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ height: "85vh", background: "#F0754C" }}
    >
      <Row className="bg-light p-5 rounded  text-left" style={{ width: "60%" }}>
      </Row>
    </Container>
  );
};

export default Home;

import Row from "react-bootstrap/Row";
import LogoutButton from "./LogoutButton";
const Welcome = () => {
  return (
    <Row className="bg-light p-5 rounded text-center ">
      <div>
        <h1>Welcome to the application</h1>
        <LogoutButton />
      </div>
    </Row>
  );
};

export default Welcome;

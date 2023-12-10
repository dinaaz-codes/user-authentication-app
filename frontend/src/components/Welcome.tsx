import Row from "react-bootstrap/Row";
import LogoutButton from "./LogoutButton";

interface IWelcomeProps {
  message: string;
}

const Welcome: React.FC<IWelcomeProps> = ({ message }) => {
  return (
    <Row className="bg-light p-5 rounded text-center ">
      <div>
        <h1>{message} </h1>
        <LogoutButton />
      </div>
    </Row>
  );
};

export default Welcome;

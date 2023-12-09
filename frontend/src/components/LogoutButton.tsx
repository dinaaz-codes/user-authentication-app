import Button from "react-bootstrap/Button";

const LogoutButton = () => {
  const handleLogout = () => {
    console.log("logging out");
  };
  return (
    <Button
      style={{ background: "#F0754C", border: "#F0754C" }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;

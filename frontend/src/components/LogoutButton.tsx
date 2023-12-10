import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { apiEndpoints } from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const LogoutButton: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      axiosPrivate.post(apiEndpoints.auth.signOut, {});
      setAuth({ accessToken: null });
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Sign out Error:", error);
    }
  };
  return (
    <Button
      style={{ background: "#F0754C", border: "#F0754C" }}
      onClick={handleLogout}
    >
      Sign Out
    </Button>
  );
};

export default LogoutButton;

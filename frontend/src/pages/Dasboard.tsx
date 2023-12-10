import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import Welcome from "../components/Welcome";
import { useLocation, useNavigate } from "react-router";
import { apiEndpoints } from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getWelcomeMessage = async () => {
      try {
        const response = await axiosPrivate.get<{ message: string }>(
          apiEndpoints.dashboard.greetings,
          {
            signal: controller.signal,
          }
        );
        isMounted && setWelcomeMessage(response.data.message);
      } catch (err) {
        console.error(err);
        navigate("/", { state: { from: location }, replace: true });
      }
    };

    getWelcomeMessage();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <MainLayout>
      <Welcome message={welcomeMessage} />
    </MainLayout>
  );
};

export default Dashboard;

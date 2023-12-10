import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dasboard";
import WithAuthentication from "./withAuthentication";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route
        path="/dashboard"
        element={
          <WithAuthentication>
            <Dashboard />
          </WithAuthentication>
        }
      ></Route>
    </Routes>
  );
};

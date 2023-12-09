import { Route, Routes } from "react-router-dom";
import { withAuthentication } from "./withAuthentication";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dasboard";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route
        path="/dashboard"
        element={withAuthentication(<Dashboard />)}
      ></Route>
    </Routes>
  );
};

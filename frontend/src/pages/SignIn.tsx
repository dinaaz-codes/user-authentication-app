import MainLayout from "../components/MainLayout";
import SignInForm, {
  ISignInInput,
  SignInFormProps,
} from "../components/forms/SignInForm";
import useAuth from "../hooks/useAuth";
import axios, { apiEndpoints } from "../api/axios";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import CustomToast from "../components/CustomToast";

const SignIn = () => {
  const { setAuth } = useAuth();

  const [toastMessage, setToastMessage] = useState<string>();
  const [isError, setIsError] = useState<boolean>(false);

  const showToast = () => {
    setTimeout(() => {
      setIsError(false);
      setToastMessage(undefined);
    }, 3000);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSignIn = async (formData: ISignInInput) => {
    try {
      const response = await axios.post(
        apiEndpoints.auth.signIn,
        JSON.stringify({ email: formData.email, password: formData.password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      setAuth({ accessToken });
      if (from === "/") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate(from, { replace: true });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      setIsError(true);
      showToast();
      if (!error?.response) {
        setToastMessage("No Server Response");
      } else if (error.response?.status === 400) {
        setToastMessage("Missing Email or Password");
      } else if (error.response?.status === 401) {
        setToastMessage("Invalid user credentials");
      } else {
        setToastMessage("Login Failed");
      }
    }
  };

  const signInFormProps: SignInFormProps = {
    onSignIn: handleSignIn,
  };

  return (
    <MainLayout>
      {isError && (
        <CustomToast
          variant="danger"
          title="Failure"
          message={toastMessage || "Login Failed!"}
        />
      )}

      <SignInForm {...signInFormProps} />
    </MainLayout>
  );
};

export default SignIn;

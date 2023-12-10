import { useNavigate } from "react-router";
import MainLayout from "../components/MainLayout";
import SignUpForm, {
  ISignUpInput,
  SignUpFormProps,
} from "../components/forms/SignUpForm";
import useAuth from "../hooks/useAuth";
import axios, { apiEndpoints } from "../api/axios";
import { useState } from "react";
import CustomToast from "../components/CustomToast";

const SignUp = () => {
  const { setAuth } = useAuth();

  const [toastMessage, setToastMessage] = useState<string>();
  const [isError, setIsError] = useState<boolean>(false);

  const showToast = () => {
    setTimeout(() => {
      setIsError(false);
      setToastMessage(undefined);
    }, 6000);
  };

  const navigate = useNavigate();

  const handleSignUp = async (formData: ISignUpInput) => {
    try {
      const body = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      };

      const response = await axios.post(
        apiEndpoints.auth.signUp,
        JSON.stringify(body),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const accessToken = response?.data?.accessToken;
      setAuth({ accessToken });

      navigate("/dashboard", { replace: true });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      setIsError(true);
      showToast();
      if (!error?.response) {
        setToastMessage("No Server Response");
      } else if (error.response?.status === 400) {
        setToastMessage("Missing form details");
      } else if (error.response?.status === 409) {
        setToastMessage("User already exists with the given email");
      } else if (error.response?.status === 401) {
        setToastMessage("Invalid user credentials");
      } else {
        setToastMessage("Sign up failed");
      }
    }
  };

  const signUnFormProps: SignUpFormProps = {
    onSignUp: handleSignUp,
  };

  return (
    <MainLayout>
      {isError && (
        <CustomToast
          variant="danger"
          title="Failure"
          message={toastMessage || "Sign Up Failed!"}
        />
      )}
      <SignUpForm {...signUnFormProps} />
    </MainLayout>
  );
};

export default SignUp;

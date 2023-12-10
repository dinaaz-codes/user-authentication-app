import { object, ref, string } from "yup";

export const signUpschema = object().shape({
  name: string()
    .required("Name is required")
    .min(2, "Name should be at least 2 characters")
    .max(20, "Name should not exceed 20 characters"),
  email: string().required("Email is required").email("Invalid email address"),
  password: string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      "Password must contain at least 1 letter, 1 number, and 1 special character"
    ),
  confirmPassword: string()
    .required("Confirm Password is required")
    .oneOf([ref("password")], "Passwords do not match"),
});

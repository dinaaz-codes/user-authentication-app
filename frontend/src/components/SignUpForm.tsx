import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpschema } from "../schema";

interface ISignUpInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignUpInput>({
    resolver: yupResolver(signUpschema),
  });

  const onSubmit: SubmitHandler<ISignUpInput> = (data) => console.log(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-4">Sign Up Here</h2>
      <hr
        className="mb-4"
        style={{ borderTop: "10px solid #F0754C", width: "10%" }}
      />

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Name"
          {...register("name")}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name && errors.name.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          placeholder="Enter Email"
          {...register("email")}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email && errors.email.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="Enter Password"
          {...register("password")}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password && errors.password.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          isInvalid={!!errors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          {errors.confirmPassword && errors.confirmPassword.message}
        </Form.Control.Feedback>
      </Form.Group>
      <div className="d-grid gap-2">
        <Button
          style={{ background: "#F0754C", border: "#F0754C" }}
          type="submit"
        >
          Sign Up
        </Button>
      </div>
    </Form>
  );
};

export default SignUpForm;

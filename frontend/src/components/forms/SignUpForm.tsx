import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpschema } from "../../schema";
import { NavLink } from "react-router-dom";

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
    reset,
  } = useForm<ISignUpInput>({
    resolver: yupResolver(signUpschema),
  });

  const onSubmit: SubmitHandler<ISignUpInput> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Row className="bg-light p-5 rounded  text-left">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-4">Sign Up Here</h2>
        <hr
          className="mb-4"
          style={{ borderTop: "10px solid #F0754C", width: "20%" }}
        />

        <Form.Group className="mb-3">
          <Form.Label style={{ color: "grey" }}>Name</Form.Label>
          <Form.Control
            type="text"
            {...register("name")}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name && errors.name.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "grey" }}>Email</Form.Label>
          <Form.Control
            type="email"
            {...register("email")}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email && errors.email.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ color: "grey" }}>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password")}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password && errors.password.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "grey" }}>Confirm Password</Form.Label>
          <Form.Control
            type="password"
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

        <div className="mt-3">
          <p className="text-muted">
            Already registered? <NavLink to="/">Sign In here</NavLink>
          </p>
        </div>
      </Form>
    </Row>
  );
};

export default SignUpForm;

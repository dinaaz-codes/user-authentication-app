import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInSchema } from "../../schema";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink } from "react-router-dom";

export type ISignInInput = {
  email: string;
  password: string;
};

export interface SignInFormProps {
  onSignIn: (data: ISignInInput) => Promise<void>;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSignIn }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ISignInInput>({
    resolver: yupResolver(signInSchema),
  });
  const onSubmit: SubmitHandler<ISignInInput> = (data) => {
    reset();
    onSignIn(data);
  };

  return (
    <>
      <Row className="bg-light p-5 rounded  text-left">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="mb-4">Sign In Here</h2>
          <hr
            className="mb-4"
            style={{ borderTop: "10px solid #F0754C", width: "20%" }}
          />

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

          <div className="d-grid gap-2">
            <Button
              style={{ background: "#F0754C", border: "#F0754C" }}
              type="submit"
            >
              Sign In
            </Button>
          </div>
          <div className="mt-3">
            <p className="text-muted">
              Not registered? <NavLink to="/sign-up">Sign up here</NavLink>
            </p>
          </div>
        </Form>
      </Row>
    </>
  );
};

export default SignInForm;

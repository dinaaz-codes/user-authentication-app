/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInSchema } from "../schema";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

type ISignInInput = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ISignInInput>({
    resolver: yupResolver(signInSchema),
  });
  const onSubmit: SubmitHandler<ISignInInput> = (data) => console.log(data);

  return (
    <Row className="bg-light p-5 rounded  text-left">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-4">Log In Here</h2>
        <hr
          className="mb-4"
          style={{ borderTop: "10px solid #F0754C", width: "20%" }}
        />

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

        <div className="d-grid gap-2">
          <Button
            style={{ background: "#F0754C", border: "#F0754C" }}
            type="submit"
          >
            Sign In
          </Button>
        </div>
      </Form>
    </Row>
  );
};

export default SignInForm;

import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

type CustomToastProps = {
  variant:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  message: string;
  title: string;
};

const CustomToast = ({ variant, title, message }: CustomToastProps) => {
  return (
    <ToastContainer className="p-3" position="top-end">
      <Toast bg={variant}>
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body className="text-white"> {message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;

import React from "react";
import ErrorPage, { ErrorType, HttpStatusCode } from "../shared/ErrorPage";

export const withAuthentication = (
  Component: React.ReactNode
): React.ReactNode => {
  return (() => {
    const isLoggedIn = true;

    if (isLoggedIn) return Component;
    return (
      <ErrorPage
        statusCode={HttpStatusCode.FORBIDDEN}
        errorType={ErrorType.FORBIDDEN}
      ></ErrorPage>
    );
  })();
};

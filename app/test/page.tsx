import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import React from "react";

const test = () => {
  return (
    <div className="mt-36">
      <div>
        <LoginLink>Sign in</LoginLink>
      </div>
      <div>
        <RegisterLink>Sign up</RegisterLink>
      </div>
    </div>
  );
};

export default test;

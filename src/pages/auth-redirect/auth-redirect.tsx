import React from "react";
import { TabLayout } from "../../components/TabLayout";
import AuthRedirectCard from "../../components/auth-redirect/AuthRedirectCard";

const AuthRedirect = () => {
  return (
    <TabLayout>
      <div className="block px-4">
        <AuthRedirectCard to="/connect/phone" message="Please login or sign up use this feature" btnText="Login / Sign Up" />
      </div>
    </TabLayout>
  );
};

export default AuthRedirect;

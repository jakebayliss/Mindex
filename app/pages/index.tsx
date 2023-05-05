import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Dashboard from "./me";

const Index = () => {

  return (
    <>
      <UnauthenticatedTemplate>

      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <Dashboard />
      </AuthenticatedTemplate>
    </>
  )
}

export default Index;
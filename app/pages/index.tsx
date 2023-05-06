import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Dashboard from "./me";
import Home from './home';

const Index = () => {

  return (
    <>
      <UnauthenticatedTemplate>
        <Home />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <Dashboard />
      </AuthenticatedTemplate>
    </>
  )
}

export default Index;
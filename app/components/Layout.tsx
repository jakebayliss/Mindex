import { useState } from 'react';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, AccountInfo } from "@azure/msal-browser";
import { msalConfig } from "../auth/authConfig";
import { UserContext } from '../auth/UserContext';
import Header from '@/components/Header';

export const msalInstance = new PublicClientApplication(msalConfig);

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  const [user, setUser] = useState<AccountInfo | null>(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <MsalProvider instance={msalInstance}>
        <Header />
        {children}
      </MsalProvider>
    </UserContext.Provider>
  )
}

export default Layout;
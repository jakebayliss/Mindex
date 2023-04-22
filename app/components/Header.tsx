import React, { useContext } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react"
import { User, UserContext } from '../auth/UserContext';
import { loginRequest } from '../auth/authConfig';

const HeaderLeft = () => <h2 className='text-2xl flex align-middle'>
    Autumn
</h2>

const Header = () => {
    const { instance } = useMsal();
    const { accounts } = useMsal();
    const { user, setUser } = useContext<User>(UserContext);

    return <div className='flex justify-between align-middle p-3 text-white bg-zinc-800'>
        <UnauthenticatedTemplate>
            <HeaderLeft />
            <button className='bg-amber-600 px-4 py-1 rounded-sm hover:shadow-inner hover:shadow-amber-700' 
                onClick={() => instance.loginPopup(loginRequest).then((response) => setUser(response.account))}>
                Login
            </button>
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
            <HeaderLeft />
            <div style={{display: 'flex', alignItems: 'center', marginRight: '20px'}}>
                <p style={{margin: '0 20px'}}>Hello {accounts[0]?.idTokenClaims?.given_name as string}!</p>
                <button className='bg-amber-600 px-4 py-1 rounded-sm hover:shadow-inner hover:shadow-amber-700' 
                    onClick={() => instance.logoutRedirect({ postLogoutRedirectUri: "/" }).then((x) => setUser(null))}>
                    Logout
                </button>
            </div>
        </AuthenticatedTemplate>
    </div>
}

export default Header;
import { LogLevel } from "@azure/msal-browser";

export const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_signupsignin"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://cryptohunt.b2clogin.com/cryptohunt.onmicrosoft.com/B2C_1_signupsignin",
        },
    },
    authorityDomain: "cryptohunt.b2clogin.com"
}

export const msalConfig = {
    auth: {
        clientId: "d6502199-0673-4562-9e88-94c9fc188ae2", 
        authority: b2cPolicies.authorities.signUpSignIn.authority, 
        knownAuthorities: [b2cPolicies.authorityDomain], 
        redirectUri: "/",
        postLogoutRedirectUri: "/",
        navigateToLoginRequestUrl: false, 
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {		
                    case LogLevel.Error:		
                        console.error(message);		
                        return;		
                    case LogLevel.Info:		
                        console.info(message);		
                        return;		
                    case LogLevel.Verbose:		
                        console.debug(message);		
                        return;		
                    case LogLevel.Warning:		
                        console.warn(message);		
                        return;
                    default:
                        return;
                }	
            }	
        }	
    }
};

export const loginRequest = {
    scopes: ["https://cryptohunt.onmicrosoft.com/hunter-api/hunter.read"]
};
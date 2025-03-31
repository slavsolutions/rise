import { useAuth0 } from "@auth0/auth0-react";

import React from 'react'

const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();
    return (        
        !isAuthenticated && (
            <div className="button" onClick={()=> loginWithRedirect({})}>
                Sign In
            </div>        
    )
    )
}

export default LoginButton

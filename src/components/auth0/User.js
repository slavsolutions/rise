import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';

const User = () => {
    const { user, isAuthenticated } = useAuth0();
    const emailWithoutQuotes = (email) => email.replace(/"/g, '');


    return (
    
            <div className="auth0__username">
                {isAuthenticated ? emailWithoutQuotes(user.email) : 'user'}
            </div>
    
    );
}

export default User;


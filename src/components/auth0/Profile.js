import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';
import LoginButton from "./LoginButton";
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    const emailWithoutQuotes = (email) => email.replace(/"/g, '');
    const navigate = useNavigate();

    return (
        <>
            <article>
                {isAuthenticated ? emailWithoutQuotes(user.email) : 'user'}
            </article>
            <div className="redirect button">
                {isAuthenticated ? <div onClick={()=>navigate('/main')}>Go to app</div> : <LoginButton />}
            </div>
        </>
    );
}

export default Profile;


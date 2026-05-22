import './auth.css';
import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';
import UpdateUserProfile from '../user/updateuserprofile';

export default function Login() {
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const navigate = useNavigate();
    function handleLogin() {
        navigate('/signup')
    }

    return (
        <div className="auth-page">

            <div className="authcontainer">

                <div className="authinfo">
                    <h2>Welcome back to NFRA</h2>

                    <ul>
                        <li>Access your referee profile</li>
                        <li>View updates and announcements</li>
                        <li>Edit your personal details anytime</li>
                    </ul>
                </div>

                <div className="authform">

                    <input className="formfield" placeholder="Email" />
                    <input className="formfield" placeholder="Password" type="password" />

                    <input
                        type="button"
                        value="Login"
                        className="authbutton"
                        onClick={() => { setShowUpdateProfile(true) }}
                    />

                    <p>
                        Don't have an account? <Link to="/signup">Create one</Link>
                    </p>

                </div>
                {showUpdateProfile && (
                    <UpdateUserProfile onClose={() => setShowUpdateProfile(false)} />
                )}

            </div>

        </div>
    );
}
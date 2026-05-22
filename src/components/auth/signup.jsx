import './auth.css';
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    function handleSignup() {
        navigate('/login')
    }

    return (
        <div className="auth-page">

            <div className="authcontainer">

                <div className="authinfo">
                    <h2>Join NFRA e-Platform</h2>

                    <ul>
                        <li>Crosscheck all information before submitting</li>
                        <li>Use a valid email address</li>
                        <li>Ensure your details are accurate</li>
                        <li>This helps us serve you better</li>
                    </ul>
                </div>

                <div className="authform">

                    <input className="formfield" placeholder="First name" />
                    <input className="formfield" placeholder="Last name" />
                    <input className="formfield" placeholder="Email" />
                    <input className="formfield" placeholder="Ref ID" />
                    <input className="formfield" placeholder="Password" type="password" />
                    <input className="formfield" placeholder="Confirm password" type="password" />

                    <input
                        type="button"
                        value="Sign Up"
                        className="authbutton"
                        onClick={handleSignup}
                    />

                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>

                </div>

            </div>

        </div>
    );
}
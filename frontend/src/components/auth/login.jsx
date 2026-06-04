import './auth.css';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState } from 'react';
import { toast } from 'react-toastify';
import UpdateUserProfile from '../user/updateuserprofile';
import api from '../../api/api';

export default function Login() {
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname; //|| "/"

    const handleChange = (e) => {

        const { name, value } = e.target;

        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const handleLogin = async () => {

        try {
            setLoading(true);
            const res = await api.post(
                "/auth/login",
                {
                    email: loginData.email,
                    password: loginData.password
                }
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            if (!res.data.user.onboardingCompleted) {

                toast.success("Login success");

                setShowUpdateProfile(true);

            } else if (res.data.user.role === "admin") {

                toast.success("Login success");

                navigate("/admin-dashboard");

            } else {


                navigate(from || "/userprofile");
                // navigate("/userprofile");
                toast.success("Login success");
            }

        } catch (error) {

            console.log(error);

            toast.error("Login failed");
        } finally {
            setLoading(false);
        }
    };

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

                    <input className="formfield" name='email' value={loginData.email} onChange={handleChange} placeholder="Email" />
                    <input className="formfield" name='password' value={loginData.password} onChange={handleChange} placeholder="Password" type="password" />

                    <button
                        className="authbutton"
                        onClick={handleLogin}
                        disabled={loading}
                    >

                        {loading ? (
                            <div className="button-spinner"></div>
                        ) : (
                            "Login"
                        )}

                    </button>

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
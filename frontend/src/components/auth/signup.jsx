import './auth.css';
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { toast } from 'react-toastify';
import api from '../../api/api';

export default function Signup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [signupData, setSignupData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        refId: "",
        password: "",
        confirmpassword: "",
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setSignupData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignup = async () => {

        const payload = {
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            email: signupData.email,
            refId: signupData.refId,
            password: signupData.password,
        };
        setLoading(true);
        try {
            if (!signupData.confirmpassword || !signupData.password || !signupData.refId || !signupData.email || !signupData.firstName || !signupData.lastName) {
                toast.error("Fill all fields")
                return;
            }
            else if (signupData.confirmpassword !== signupData.password) {
                toast.error("Recheck credentials")
                return;
            } else {

                const res = await api.post(
                    "/auth/signup",
                    payload
                );
                console.log(res.data);

                toast.success(
                    "User created successfully"
                );

                navigate("/login");

            }


        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message || "Signup failed"
            );
        } finally {
            setLoading(false);
        }
    };

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

                    <input className="formfield" value={signupData.firstName} onChange={handleChange} name='firstName' placeholder="First name" required />
                    <input className="formfield" value={signupData.lastName} onChange={handleChange} name='lastName' placeholder="Last name" required />
                    <input className="formfield" value={signupData.email} onChange={handleChange} name='email' placeholder="Email" required />
                    <input className="formfield" value={signupData.refId.toUpperCase().replaceAll(" ", "")} onChange={handleChange} name='refId' placeholder="Ref ID" required />
                    <input className="formfield" value={signupData.password} onChange={handleChange} name='password' placeholder="Password" type="password" required />
                    <input className="formfield" value={signupData.confirmpassword} onChange={handleChange} name='confirmpassword' placeholder="Confirm password" type="password" required />

                    <button
                        className="authbutton"
                        onClick={handleSignup}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="button-spinner"></div>
                        ) : (
                            "Sign up"
                        )}

                    </button>

                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>

                </div>

            </div>

        </div>
    );
}
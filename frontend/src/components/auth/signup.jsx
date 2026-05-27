import './auth.css';
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { toast } from 'react-toastify';
import api from '../../api/api';

export default function Signup() {
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setSignupData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignup = async () => {

        try {

            const res = await api.post(
                "/auth/signup",
                signupData
            );

            console.log(res.data);

            toast.success(
                "User created successfully"
            );

            navigate("/login");

        } catch (error) {

            console.log(error);

            toast.error(
                "Signup failed"
            );
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

                    <input required className="formfield" value={signupData.firstName} onChange={handleChange} name='firstName' placeholder="First name" />
                    <input className="formfield" value={signupData.lastName} onChange={handleChange} name='lastName' placeholder="Last name" />
                    <input className="formfield" value={signupData.email} onChange={handleChange} name='email' placeholder="Email" />
                    <input className="formfield" name='' placeholder="Ref ID" />
                    <input className="formfield" value={signupData.password} onChange={handleChange} name='password' placeholder="Password" type="password" />
                    <input className="formfield" name='' placeholder="Confirm password" type="password" />

                    <input
                        type="button"
                        value="Sign Up"
                        className="authbutton"
                        onClick={() => {
                            handleSignup()

                        }}
                    />

                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>

                </div>

            </div>

        </div>
    );
}
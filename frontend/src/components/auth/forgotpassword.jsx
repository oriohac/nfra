import { useState } from "react";
import "./auth.css";
import api from "../../api/api";
import { toast } from "react-toastify";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {

        if (!email) {

            toast.error("Enter your email");

            return;
        }

        try {

            setLoading(true);

            const res = await api.post(
                "/auth/forgot-password",
                { email }
            );

            toast.success(
                res.data.message
            );

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="auth-page">

            <div className="authcontainer">

                <div className="authinfo">

                    <h2>Forgot Password</h2>

                    <ul>
                        <li>Enter your registered email</li>
                        <li>A reset link will be sent to you</li>
                        <li>Use the link to create a new password</li>
                    </ul>

                </div>

                <div className="authform">

                    <input
                        className="formfield"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <button
                        className="authbutton"
                        onClick={handleForgotPassword}
                        disabled={loading}
                    >

                        {loading ? (
                            <div className="button-spinner"></div>
                        ) : (
                            "Send Reset Link"
                        )}

                    </button>

                </div>

            </div>

        </div>
    );
}
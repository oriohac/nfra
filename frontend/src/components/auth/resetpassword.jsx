import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./auth.css";
import api from "../../api/api";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {

    const { token } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleResetPassword = async () => {

        if (
            !formData.password ||
            !formData.confirmPassword
        ) {

            toast.error("Fill all fields");

            return;
        }

        if (
            formData.password !==
            formData.confirmPassword
        ) {

            toast.error("Passwords do not match");

            return;
        }

        try {

            setLoading(true);

            const res = await api.post(
                `/auth/reset-password/${token}`,
                {
                    password: formData.password,
                }
            );

            toast.success(
                res.data.message
            );

            navigate("/login");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Reset failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="auth-page">

            <div className="authcontainer">

                <div className="authinfo">

                    <h2>Reset Password</h2>

                </div>

                <div className="authform">

                    <div className="password-field">

                        <input
                            className="formfield"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="New Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <span
                            className="password-toggle"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            {showPassword ? (
                                <FaEyeSlash />
                            ) : (
                                <FaEye />
                            )}
                        </span>

                    </div>

                    <div className="password-field">

                        <input
                            className="formfield"
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />

                        <span
                            className="password-toggle"
                            onClick={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                        >
                            {showConfirmPassword ? (
                                <FaEyeSlash />
                            ) : (
                                <FaEye />
                            )}
                        </span>

                    </div>

                    <button
                        className="authbutton"
                        onClick={handleResetPassword}
                        disabled={loading}
                    >

                        {loading ? (
                            <div className="button-spinner"></div>
                        ) : (
                            "Reset Password"
                        )}

                    </button>

                </div>

            </div>

        </div>
    );
}
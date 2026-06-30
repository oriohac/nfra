import { useState } from "react";
import "./updatepassword.css";
import api from "../../api/api";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdatePassword = async () => {

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {

      toast.error("Fill all fields");
      return;
    }

    if (
      formData.newPassword !== formData.confirmPassword
    ) {

      toast.error("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await api.patch(
        `/auth/update-password/${user._id}`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }
      );

      toast.success(
        response.data.message || "Password updated successfully"
      );

      navigate("/userprofile");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update password"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="update-password-page">

      <div className="update-password-card">

        <h2>Update Password</h2>

        {/* Current Password */}

        <div className="password-field">

          <input
            type={
              showOldPassword ? "text" : "password"
            }
            placeholder="Current Password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
          />

          <span
            className="password-toggle"
            onClick={() =>
              setShowOldPassword(!showOldPassword)
            }
          >
            {showOldPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </span>

        </div>

        {/* New Password */}

        <div className="password-field">

          <input
            type={
              showNewPassword ? "text" : "password"
            }
            placeholder="New Password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />

          <span
            className="password-toggle"
            onClick={() =>
              setShowNewPassword(!showNewPassword)
            }
          >
            {showNewPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </span>

        </div>

        {/* Confirm Password */}

        <div className="password-field">

          <input
            type={
              showConfirmPassword ? "text" : "password"
            }
            placeholder="Confirm New Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <span
            className="password-toggle"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
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
          className="update-password-btn"
          onClick={handleUpdatePassword}
          disabled={loading}
        >
          {loading ? (
            <div className="button-spinner"></div>
          ) : (
            "Update Password"
          )}
        </button>

      </div>

    </div>
  );
}
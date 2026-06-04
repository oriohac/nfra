import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './userprofile.css';
import api from "../../api/api";
import {
  FaBasketballBall,
  FaCalendarPlus,
  FaFileAlt,
  FaExclamationTriangle,
  FaEdit,
  FaSave,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../config";

export default function UserProfile() {
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [initialFormData, setInitialFormData] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    grade: "",
    refId: "",
  });

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const user = JSON.parse(
          localStorage.getItem("user")
        );

        const response = await api.get(
          `/auth/user/${user._id}`
        );

        setProfile(response.data);
        console.log(response.data)

        setFormData({
          phone: response.data.phone || "",
          grade: response.data.grade || "",
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          refId: response.data.refId || "",
        });

      } catch (error) {

        console.log(error);

      }

    };

    fetchProfile();

  }, []);

  const handleSave = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const form = new FormData();

      form.append("phone", formData.phone);
      form.append("grade", formData.grade);
      form.append("firstName", formData.firstName);
      form.append("lastName", formData.lastName);
      form.append("refId", formData.refId);

      if (profilePhoto) {
        form.append("profilePhoto", profilePhoto);
      }

      const response = await api.patch(
        `/auth/user/${user._id}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfile(response.data);

      setIsEditing(false);

      toast.success("Profile updated successfully");

    } catch (error) {

      console.log(error);

      toast.error("Failed to update profile");
    }
  };



  if (!profile) {
    return (
    <div className="user-loader">
      <div className="spinner"></div>
      <p>Loading dashboard...</p>
    </div>
  );
  }

  const cards = [
    {
      title: "Total Matches Officiated",
      icon: <FaBasketballBall />,
    },
    {
      title: "New Appointment",
      icon: <FaCalendarPlus />,
    },
    {
      title: "Submit Match Report",
      icon: <FaFileAlt />,
    },
    {
      title: "Disciplinary Action",
      icon: <FaExclamationTriangle />,
    },
  ];

  const formattedDate =
  new Date(profile.dateOfBirth)
    .toLocaleDateString(
      "en-GB",
      {

        day: "2-digit",

        month: "short",

        year: "numeric"

      }
    );

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-header">
          <div
            className="avatar-container"
            onClick={() => {
              if (isEditing) {
                fileInputRef.current.click();
              }
            }}
          >

            <img
              src={
                profilePhoto
                  ? URL.createObjectURL(profilePhoto)
                  : profile.profilePhoto
              }
              alt="profile"
              className="avatar"
            />

            {isEditing && (
              <div className="avatar-overlay">
                <FaEdit className="edit-icon" />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                setProfilePhoto(e.target.files[0]);
              }}
            />

          </div>

          <div className="profile-info">
            <h2> {isEditing
              ? (<input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstName: e.target.value,
                  })
                }
              >
              </input>
              )
              : (profile.firstName)} {isEditing
                ? (<input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lastName: e.target.value,
                    })
                  }
                >
                </input>)

                : (profile.lastName)}</h2>
            <p>{profile.email}</p>
          </div>
        </div>




        <div className="profile-grid">

          <div>
            <strong>Phone: </strong>
            {isEditing ? (
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
              />
            ) : (
              profile.phone
            )}
          </div>

          <div>
            <strong>State: </strong>
            {profile.state}
          </div>

          <div>
            <strong>Gender: </strong>
            {profile.gender}
          </div>

          <div>
            <strong>DOB: </strong>
            {formattedDate}
          </div>

          <div>
            <strong>Grade: </strong>
            {isEditing ? (
              <select
                value={formData.grade}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    grade: e.target.value,
                  })
                }
              >
                <option value="" disabled>Select Grade</option>
                <option value="One">One</option>
                <option value="FIFA">FIFA</option>
                <option value="RTD">RTD</option>
                <option value="FIFA RTD">FIFA RTD</option>
              </select>
            ) : (
              profile.grade
            )}
          </div>

          <div>
            <strong>Specialization: </strong>
            {profile.specialization}
          </div>

          <div>
            <strong>Ref ID: </strong>
            {isEditing
              ? (<input
                type="text"
                value={formData.refId.toUpperCase().replaceAll(" ", "")}
                onChange={
                  (e) =>
                    setFormData({
                      ...formData,
                      refId: e.target.value,
                    })
                }
              />
              )
              : (profile.refId)
            }
          </div>

        </div>

        {!isEditing ? (
          <button
            className="edit-btn"
            onClick={() => {
              setInitialFormData(formData);
              setIsEditing(true);
            }}
          >
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <div className="edit-actions">
            <button className="save-btn" onClick={handleSave}>
              <FaSave /> Save Changes
            </button>

            <button
              className="cancel-btn"
              onClick={() => {
                setFormData(initialFormData);
                setProfilePhoto(null);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}


        {/* DASHBOARD BOXES */}

        <div className="dashboard-boxes">

          {cards.map((item, index) => (
            <div
              key={index}
              className="dashboard-card"
              onClick={() => navigate("/coming-soon")}
            >
              <div className="dashboard-icon">
                {item.icon}
              </div>

              <p>{item.title}</p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
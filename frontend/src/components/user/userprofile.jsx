import { useEffect, useState } from "react";
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

export default function UserProfile() {
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    grade: "",
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
        });

      } catch (error) {

        console.log(error);

      }

    };

    fetchProfile();

  }, []);

  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await api.patch(
        `/auth/user/${user._id}`,
        {
          phone: formData.phone,
          grade: formData.grade,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }
      );

      setProfile(response.data);

      setIsEditing(false);

      toast.info("Profile updated successfully");

    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  if (!profile) {
    return <h2>No profile found</h2>;
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

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-header">
          <div className="avatar">
            <img
              src={`http://localhost:5000${profile.profilePhoto}`}
              alt="profile"
              className="avatar"
            />
          </div>

          <div>
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

          {/* <div>
            <button style={{ padding: 12, borderRadius: 20, backgroundColor: "red", color: "white", fontSize: 16, fontWeight: "bold", border: "none" }} onClick={() => {
              localStorage.clear()
              navigate("/login")
            }}>Logout</button>
          </div>

          <div>
            <strong>Role: </strong>
            {profile.role}
          </div> */}
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
            {profile.day} {profile.month}, {profile.year}
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
                <option value="" disabled selected>Select Grade</option>
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

        </div>

        {!isEditing ? (
          <button
            className="edit-btn"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <button
            className="save-btn"
            onClick={handleSave}
          >
            <FaSave /> Save Changes
          </button>
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
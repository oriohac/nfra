import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaMale,
  FaFemale,
  FaClipboardList,
  FaMapMarkedAlt,
  FaNewspaper,
  FaRunning,
} from "react-icons/fa";
import api from "../../api/api";
import CreatePost from "./createpost";

import "./admindashboard.css";

export default function AdminDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] =
    useState(null);

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await api.get(
            "/admin/stats",
          );

        setStats(response.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchStats();

  }, []);

  if (!stats) {
     return (
    <div className="admin-loader">
      <div className="spinner"></div>
      <p>Loading dashboard...</p>
    </div>
  );
  }

  return (
    <div className="admin-dashboard">

    <div className="admin-header">
      <div>
        <h1>NFRA Admin Dashboard</h1>
        <p>
          Monitor referees, zones, registrations and activities.
        </p>
      </div>
    </div>

    <div className="stats-grid">

      <div
        className="dashboard-card primary"
        onClick={() => navigate("/admin/users/all")}
      >
        <div className="card-icon">
          <FaUsers />
        </div>

        <div>
          <h3>Total Users</h3>
          <h2>{stats.users}</h2>
        </div>
      </div>

      <div
        className="dashboard-card"
        onClick={() => navigate("/admin/users/male")}
      >
        <div className="card-icon blue">
          <FaMale />
        </div>

        <div>
          <h3>Male Referees</h3>
          <h2>{stats.maleUsers}</h2>
        </div>
      </div>

      <div
        className="dashboard-card"
        onClick={() => navigate("/admin/users/female")}
      >
        <div className="card-icon pink">
          <FaFemale />
        </div>

        <div>
          <h3>Female Referees</h3>
          <h2>{stats.femaleUsers}</h2>
        </div>
      </div>

      <div
        className="dashboard-card"
        onClick={() =>
          navigate(
            `/admin/users/${encodeURIComponent(
              "Southern Zone Group A"
            )}`
          )
        }
      >
        <div className="card-icon green">
          <FaMapMarkedAlt />
        </div>

        <div>
          <h3>Southern Zone A</h3>
          <h2>{stats.southernZoneGroupA}</h2>
        </div>
      </div>

      <div
        className="dashboard-card"
        onClick={() =>
          navigate(
            `/admin/users/${encodeURIComponent(
              "Southern Zone Group B"
            )}`
          )
        }
      >
        <div className="card-icon green">
          <FaMapMarkedAlt />
        </div>

        <div>
          <h3>Southern Zone B</h3>
          <h2>{stats.southernZoneGroupB}</h2>
        </div>
      </div>

      <div
        className="dashboard-card"
        onClick={() =>
          navigate(
            `/admin/users/${encodeURIComponent(
              "Northern Zone Group A"
            )}`
          )
        }
      >
        <div className="card-icon orange">
          <FaMapMarkedAlt />
        </div>

        <div>
          <h3>Northern Zone A</h3>
          <h2>{stats.northernZoneGroupA}</h2>
        </div>
      </div>

      <div
        className="dashboard-card"
        onClick={() =>
          navigate(
            `/admin/users/${encodeURIComponent(
              "Northern Zone Group B"
            )}`
          )
        }
      >
        <div className="card-icon orange">
          <FaMapMarkedAlt />
        </div>

        <div>
          <h3>Northern Zone B</h3>
          <h2>{stats.northernZoneGroupB}</h2>
        </div>
      </div>

      <div
        className="dashboard-card"
        onClick={() =>
          navigate(
            `/admin/users/${encodeURIComponent(
              "Female Southern Zone"
            )}`
          )
        }
      >
        <div className="card-icon purple">
          <FaFemale />
        </div>

        <div>
          <h3>Female South</h3>
          <h2>{stats.femaleSouthernZone}</h2>
        </div>
      </div>

      <div
        className="dashboard-card"
        onClick={() =>
          navigate(
            `/admin/users/${encodeURIComponent(
              "Female Northern Zone"
            )}`
          )
        }
      >
        <div className="card-icon purple">
          <FaFemale />
        </div>

        <div>
          <h3>Female North</h3>
          <h2>{stats.femaleNorthernZone}</h2>
        </div>
      </div>

      <div
        className="dashboard-card"
        onClick={() => navigate("/admin/manage-posts")}
      >
        <div className="card-icon dark">
          <FaNewspaper />
        </div>

        <div>
          <h3>Manage Posts</h3>
          <p>View, edit and delete posts</p>
        </div>
      </div>

      <div
        className="dashboard-card"
        onClick={() =>
          navigate("/admin/fitness-test-attendees")
        }
      >
        <div className="card-icon red">
          <FaRunning />
        </div>

        <div>
          <h3>Fitness Interest</h3>
          <h2>{stats.fitnessTestAttendees}</h2>
        </div>
      </div>

    </div>

    <div className="dashboard-bottom">

      <div className="states-section">

        <div className="section-header">
          <FaClipboardList />
          <h2>Registrations Per State</h2>
        </div>

        <div className="states-grid">
          {stats.usersPerState.map((item) => (
            <div
              key={item._id}
              className="state-item"
            >
              <span>{item._id}</span>
              <strong>{item.count}</strong>
            </div>
          ))}
        </div>

      </div>

    </div>

    <div className="create-post-wrapper">
      <CreatePost />
    </div>

  </div>

  );

}
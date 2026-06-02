import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/api";
import CreatePost from "./createpost";
import ManagePosts from "./manageposts";

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
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setStats(response.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchStats();

  }, []);

  if (!stats) {
    return <h2>Loading...</h2>;
  }

  return (

    <div className="admin-page">

      <h1>Admin Dashboard</h1>

      <div className="stats-grid">

        <div className="stat-card" onClick={() => navigate("/admin/users/all")}>
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>



        <div className="stat-card"
          onClick={() => navigate("/admin/users/male")}>
          <h3>Male Referees</h3>
          <p>{stats.maleUsers}</p>
        </div>

        <div className="stat-card"
          onClick={() => navigate("/admin/users/female")}>
          <h3>Female Referees</h3>
          <p>{stats.femaleUsers}</p>
        </div>

        <div className="stat-card"
          onClick={() =>
            navigate(
              `/admin/users/${encodeURIComponent(
                "Southern Zone Group A"
              )}`
            )
          }>
          <h3>Male Southern Zone Group A  </h3>
          <p>{stats.southernZoneGroupA}</p>
        </div>

        <div className="stat-card"
          onClick={() =>
            navigate(
              `/admin/users/${encodeURIComponent(
                "Southern Zone Group B"
              )}`
            )
          }>
          <h3>Male Southern Zone Group B  </h3>
          <p>{stats.southernZoneGroupB}</p>
        </div>

        <div className="stat-card"
          onClick={() =>
            navigate(
              `/admin/users/${encodeURIComponent(
                "Northern Zone Group A"
              )}`
            )
          }>
          <h3>Male Northern Zone Group A </h3>
          <p>{stats.northernZoneGroupA}</p>
        </div>

        <div className="stat-card"
          onClick={() =>
            navigate(
              `/admin/users/${encodeURIComponent(
                "Northern Zone Group B"
              )}`
            )
          }>
          <h3>Male Northern Zone Group B </h3>
          <p>{stats.northernZoneGroupB}</p>
        </div>

        <div className="stat-card"
          onClick={() =>
            navigate(
              `/admin/users/${encodeURIComponent(
                "Female Southern Zone"
              )}`
            )
          }>
          <h3>Female Southern Zone</h3>
          <p>{stats.femaleSouthernZone}</p>
        </div>

        <div className="stat-card"
          onClick={() =>
            navigate(
              `/admin/users/${encodeURIComponent(
                "Female Northern Zone"
              )}`
            )
          }>
          <h3>Female Northern Zone</h3>
          <p>{stats.femaleNorthernZone}</p>
        </div>

        <div
          className="admin-card"
          onClick={() => navigate("/admin/manage-posts")}
        >
          <h3>Manage Posts</h3>

          <p>View, edit and delete posts</p>
        </div>

        <div className="stat-card"

          onClick={() =>
            navigate( "/admin/fitness-test-attendees" )
          } >

          <h3>
            Fitness Test Interest
          </h3>

          <p>
            {stats.fitnessTestAttendees}
          </p>

        </div>

      </div>

      <div className="state-section">

        <h2>Registrations Per State</h2>

        {stats.usersPerState.map((item) => (

          <div
            key={item._id}
            className="state-card"
          >

            <span>{item._id}</span>

            <strong>{item.count}</strong>

          </div>

        ))}


      </div>


      <CreatePost />



    </div>



  );

}
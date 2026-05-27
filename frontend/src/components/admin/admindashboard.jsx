import { useEffect, useState } from "react";

import api from "../../api/api";
import CreatePost from "./createpost";
import ManagePosts from "./manageposts";

import "./admindashboard.css";

export default function AdminDashboard() {

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

        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>

        <div className="stat-card">
          <h3>Total Matches</h3>
          <p>{stats.matches}</p>
        </div>

        <div className="stat-card">
          <h3>Total Reports</h3>
          <p>{stats.reports}</p>
        </div>

        <div className="stat-card">
          <h3>Male Referees</h3>
          <p>{stats.maleUsers}</p>
        </div>

        <div className="stat-card">
          <h3>Female Referees</h3>
          <p>{stats.femaleUsers}</p>
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

       <ManagePosts />
     

    </div>
    
    

  );

}
import './userprofile.css';

export default function UserProfile() {

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-header">
          <div className="avatar"></div>

          <div>
            <h2>Chikezirim Orioha</h2>
            <p>chike@email.com</p>
          </div>
        </div>

        <div className="profile-grid">

          <div><strong>Phone:</strong> 080XXXXXXXX</div>
          <div><strong>State:</strong> Abia</div>
          <div><strong>Gender:</strong> Male</div>
          <div><strong>DOB:</strong> 12-05-2000</div>
          <div><strong>Specialization:</strong> Referee</div>
          <div><strong>Grade:</strong> FIFA</div>
          <div><strong>Last Grade Year:</strong> 2023</div>

        </div>

        <button className="edit-btn">
          Edit Profile
        </button>

      </div>

    </div>
  );
}
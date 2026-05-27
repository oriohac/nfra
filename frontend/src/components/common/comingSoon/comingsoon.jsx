import { useNavigate } from "react-router-dom";
import "./comingsoon.css";

export default function ComingSoon() {

  const navigate = useNavigate();

  return (
    <div className="coming-soon-page">

      <div className="coming-soon-card">

        <h1>🚧 Coming Soon</h1>

        <p>
          This feature is currently under development.
        </p>

        <button onClick={() => navigate(-1)}>
          Go Back
        </button>

      </div>

    </div>
  );
}
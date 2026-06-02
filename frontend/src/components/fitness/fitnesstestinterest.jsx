import "./fitnesstestinterest.css";

import {

  useNavigate

} from "react-router-dom";

import api from "../../api/api";

import {

  toast

} from "react-toastify";

export default function
FitnessTestInterest() {

  const navigate =
    useNavigate();

  const handleAttend =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await api.post(

          "/auth/fitness-test-interest",

          {},

          {

            headers: {

              Authorization:
                `Bearer ${token}`

            }

          }

        );

        toast.success(

          "Attendance confirmed"

        );

      } catch (error) {

        console.log(error);

        toast.info(

          error.response?.data
            ?.message ||

          "Something went wrong"

        );

      }

    };

  return (

    <div className="fitness-page">

      <div className="fitness-card">

        <h2>

          NFRA Fitness Test

        </h2>

        <p>

          You are about to
          show interest for the
          forthcoming Nigeria
          Football Referees
          Association fitness
          test.

        </p>

        <p>

          Click attending to
          verify you’ll attend
          or cancel to go back.

        </p>

        <div className="fitness-actions">

          <button

            className="cancel-btn"

            onClick={() =>
              navigate(-1)
            }
          >

            Cancel

          </button>

          <button

            className="attend-btn"

            onClick={
              handleAttend
            }
          >

            Attending

          </button>

        </div>

      </div>

    </div>

  );

}
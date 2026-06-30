import {

  useEffect,
  useState

} from "react";

import api from "../../api/api";

import "./fitnesstestattendees.css";

export default function
FitnessTestAttendees() {

  const [attendees,
    setAttendees] =
      useState([]);

  const [loading,
    setLoading] =
      useState(true);

  const [sortConfig,
    setSortConfig] =
      useState({

        key: "",

        direction: "asc"

      });

  useEffect(() => {

    fetchAttendees();

  }, []);

  const fetchAttendees =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await api.get(

            "/admin/fitness-test-interest",

            {

              headers: {

                Authorization:
                  `Bearer ${token}`

              }

            }

          );

        setAttendees(
          response.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  const handleSort = (key) => {

    let direction = "asc";

    if (

      sortConfig.key === key &&

      sortConfig.direction ===
      "asc"

    ) {

      direction = "desc";

    }

    setSortConfig({
      key,
      direction
    });

    const sorted =
      [...attendees].sort(

        (a, b) => {

          const aValue =
            a.user?.[key] || "";

          const bValue =
            b.user?.[key] || "";

          if (
            aValue < bValue
          ) {

            return direction ===
              "asc"
              ? -1
              : 1;

          }

          if (
            aValue > bValue
          ) {

            return direction ===
              "asc"
              ? 1
              : -1;

          }

          return 0;

        }

      );

    setAttendees(sorted);

  };

  if (loading) {

    return (

      <div className="fitness-admin-page">

        <h2>Loading...</h2>

      </div>

    );

  }

  return (

    <div className="fitness-admin-page">

      <div className="fitness-admin-header">

        <h1>
          Fitness Test Attendees
        </h1>

        <p>
          Users who have
          indicated interest
          in attending the
          NFRA fitness test
        </p>

      </div>

      <div className="fitness-table-wrapper">

        <table
          className="fitness-table"
        >

          <thead>

            <tr>
                <th 
                onClick={() =>
                  handleSort(
                    "_id"
                )
                }
                            > 
                            S/N
                        </th>

              <th
                onClick={() =>
                  handleSort(
                    "firstName"
                  )
                }
              >

                Name

              </th>

              <th
                onClick={() =>
                  handleSort(
                    "state"
                  )
                }
              >

                State

              </th>

              <th
                onClick={() =>
                  handleSort(
                    "grade"
                  )
                }
              >

                Grade

              </th>

              <th
                onClick={() =>
                  handleSort(
                    "specialization"
                  )
                }
              >

                Specialization

              </th>

              <th
                onClick={() =>
                  handleSort(
                    "zone"
                  )
                }
              >

                Zone

              </th>

              <th
                onClick={() =>
                  handleSort(
                    "gender"
                  )
                }
              >

                Gender

              </th>

              <th
                onClick={() =>
                  handleSort(
                    "phone"
                  )
                }
              >

                Phone

              </th>

            </tr>

          </thead>

          <tbody>

            {
              attendees.length === 0

              ?

              <tr>

                <td
                  colSpan="7"
                  className="empty-cell"
                >

                  No attendees yet

                </td>

              </tr>

              :

              attendees.map((item, index) => (

                <tr
                  key={item._id}
                >
                 <td>
                     {index + 1}
                 </td>

                  <td>

                    {
                      item.user
                        ?.firstName
                    }

                    {" "}

                    {
                      item.user
                        ?.lastName
                    }

                  </td>

                  <td>
                    {
                      item.user
                        ?.state
                    }
                  </td>

                  <td>
                    {
                      item.user
                        ?.grade
                    }
                  </td>

                  <td>
                    {
                      item.user
                        ?.specialization
                    }
                  </td>

                  <td>
                    {
                      item.user
                        ?.zone
                    }
                  </td>

                  <td>
                    {
                      item.user
                        ?.gender
                    }
                  </td>

                  <td>
                    {
                      item.user
                        ?.phone
                    }
                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}
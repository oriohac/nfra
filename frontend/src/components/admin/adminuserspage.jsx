import { useEffect, useState } from "react";

import { useParams, useLocation } from "react-router-dom";

import api from "../../api/api";

import "./adminuserspage.css";

export default function AdminUsersPage() {

    const { zone } = useParams();

    

    const location = useLocation();

    const [users, setUsers] = useState([]);

    const [sortField, setSortField] = useState("");

    const [sortOrder, setSortOrder] = useState("asc");

    const getEndpointAndTitle = () => {
        const path = location.pathname;
        if (path.includes("/admin/users/all")) {
            return { endpoint: "/admin/users/all", title: "All Users" };
        }
        if (path.includes("/admin/users/male")) {
            return { endpoint: "/admin/users/male", title: "Male Referees" };
        }
        if (path.includes("/admin/users/female")) {
            return { endpoint: "/admin/users/female", title: "Female Referees" };
        }

        if (zone) {
            return { endpoint: `/admin/users/${encodeURIComponent(zone)}`, title: zone };
        }
        // Fallback (should not happen)
        return { endpoint: "/admin/users/all", title: "Users" };
    };

    const { title } = getEndpointAndTitle();

    useEffect(() => { fetchUsers(); }, [location.pathname, zone]);

    const fetchUsers = async () => {

        try {
            const token = localStorage.getItem("token");
            const { endpoint } = getEndpointAndTitle();
            const response = await api.get(endpoint, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleSort = (field) => {

        let order = "asc";

        if (
            sortField === field &&
            sortOrder === "asc"
        ) {
            order = "desc";
        }

        setSortField(field);

        setSortOrder(order);

        const sortedUsers = [...users].sort(
            (a, b) => {

                const aValue =
                    a[field]?.toString().toLowerCase() || "";

                const bValue =
                    b[field]?.toString().toLowerCase() || "";

                if (order === "asc") {

                    return aValue.localeCompare(
                        bValue
                    );

                } else {

                    return bValue.localeCompare(
                        aValue
                    );

                }

            }
        );

        setUsers(sortedUsers);

    };

    return (

        <div className="admin-users-page">

            <h2>{title}</h2>

            <table>

                <thead>

                    <tr>
                        <th onClick={() =>
                                handleSort("_id")
                            }> 
                            S/N
                        </th>

                        <th
                            onClick={() =>
                                handleSort("firstName")
                            }
                        >
                            Name
                        </th>

                        <th
                            onClick={() =>
                                handleSort("state")
                            }
                        >
                            State
                        </th>

                        <th
                            onClick={() =>
                                handleSort("grade")
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
                                handleSort("zone")
                            }
                        >
                            Zone
                        </th>

                        <th
                            onClick={() =>
                                handleSort("gender")
                            }
                        >
                            Gender
                        </th>

                        <th
                            onClick={() =>
                                handleSort("phone")
                            }
                        >
                            Phone
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {users.map((user, index) => (

                        <tr key={user._id}>
                            <td>
                                {index + 1}
                            </td>

                            <td>
                                {user.firstName}{" "}
                                {user.lastName}
                            </td>

                            <td>{user.state}</td>

                            <td>{user.grade}</td>

                            <td>
                                {user.specialization}
                            </td>

                            <td>{user.zone}</td>

                            <td>{user.gender}</td>

                            <td>{user.phone}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}
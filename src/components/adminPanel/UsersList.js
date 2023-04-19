import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchUserFromToken } from "../userPanel/getUser";

export default function UsersList() {
  const [users, setUsers] = useState([{}]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (!tokenFromStorage) {
      window.location.href = "/login";
    }
    setToken(tokenFromStorage);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const fetchedUser = await fetchUserFromToken(token);
      setUser(fetchedUser);
    };
    getUser();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/users`
      );
      setUsers(data.data);
    };
    fetchData();
  }, [setUsers]);
  return (
    <>
      <div className="p-3"></div>
      <h1 className="display-4 mb-4 pb-4">All Users</h1>
      <table class="table table-striped text-white">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Address</th>
          </tr>
        </thead>
        {users && (
          <tbody>
            {users.map((u, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>{u.mobileNumber === "" ? "-" : u.mobileNumber}</td>
                  <td>{u.address === "" ? "-" : u.address}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </>
  );
}

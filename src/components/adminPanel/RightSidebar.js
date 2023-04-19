import React, { useEffect, useState } from "react";
import { fetchUserFromToken } from "../userPanel/getUser";
import { Link } from "react-router-dom";

export default function RightSidebar() {
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
  return (
    <div className="right-sidebar-container mh-100 p-4 bg-light">
      {user && (
        <div className="form">
          <h3 className="py-3 mb-5">Admin Details</h3>
          <div class="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              class="form-control"
              disabled
              value={user.fullName}
            />
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input
              type="text"
              class="form-control"
              disabled
              value={user.email}
            />
          </div>
        </div>
      )}
      <Link to="/logout">
        <button className="btn btn-danger">Logout</button>
      </Link>
    </div>
  );
}

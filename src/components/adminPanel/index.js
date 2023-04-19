import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { fetchUserFromToken } from "../userPanel/getUser";
import axios from "axios";
import Layout from "./Layout";
import BookingDetails from "./BookingDetails";

export default function AdminPanel() {
  const [flights, setFlights] = useState([{}]);
  const [bookedFlights, setBookedFlights] = useState([{}]);
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
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/flight`);
      setFlights(data.data);
    };
    fetchData();
  }, [setFlights]);
  return (
    <Layout>
      <div className="main-container">
        <div className="container">
          <div className="p-4"></div>
          <div className="row">
            <div className="col-md-12 mb-4">
              <BookingDetails />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

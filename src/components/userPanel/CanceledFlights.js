import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import { fetchUserFromToken } from "./getUser";
import TicketCard from "./TicketCard";
import Ticket from "./Ticket";

export default function CanceledFlights() {
  const [userCanceledFlights, setUserCanceledFlights] = useState([{}]);
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
    const fetchBookedFlightsData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/flights`,
        config
      );
      console.log(data.data);
      setUserCanceledFlights(data.data);
    };
    fetchBookedFlightsData();
  }, [setUserCanceledFlights]);

  return (
    <Layout>
      <div className="main-container">
        <div className="container">
          <div className="p-4"></div>
          <div className="row">
            <div className="col-md-12 mb-4">
              {user && (
                <div className="mb-4 d-flex justify-content-end">
                  <div className="user-profile-card d-flex px-4 py-2 align-items-center">
                    <i className="fas fa-user"></i>
                    <p className="ml-3 m-0">{user.fullName} </p>
                  </div>
                </div>
              )}
              <h1 className="display-4 pb-4"> Canceled flights:</h1>
              {userCanceledFlights.map((booking, idx) => {
                if (booking.bookingStatus === "booked") return null;
                return (
                  <Ticket booking={booking} key={idx} hideCancelButton={true} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

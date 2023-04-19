import React, { useEffect, useState } from "react";
import { fetchUserFromToken } from "../userPanel/getUser";
import axios from "axios";

export default function BookingDetails() {
  const [bookings, setBookings] = useState([{}]);
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
        `${process.env.REACT_APP_API_URL}/admin/book`
      );
      setBookings(data.data);
    };
    fetchData();
  }, [setBookings]);
  return (
    <>
      <div className="p-3"></div>
      <h1 className="display-4 mb-4 pb-4">Recent Bookings</h1>
      <table class="table table-striped text-white">
        <thead>
          <tr>
            <th>Number</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
            <th>Class</th>
            <th>Status</th>
            <th>Guests</th>
            <th>Total</th>
          </tr>
        </thead>
        {bookings && (
          <tbody>
            {console.log(bookings)}
            {bookings.map((b, idx) => {
              return (
                <tr key={idx}>
                  {b && b.flightId && (
                    <>
                      <td>{idx + 1}</td>
                      <td>{b.flightId.fromLocation}</td>
                      <td>{b.flightId.toLocation}</td>
                      <td>{b.flightId.date.trim(0, 13)}</td>
                      <td>{b.classType}</td>
                      <td>{b.bookingStatus}</td>
                      <td>{b.guestCount}</td>
                      <td>${b.guestCount * b.flightId.price}</td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </>
  );
}

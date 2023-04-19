import React from "react";
import axios from "axios";

export default function Ticket({ booking, hideCancelButton = false }) {
  const handleCancelFlight = async () => {
    const data = { ...booking, bookingStatus: "canceled" };
    const config = {
      header: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/book/${booking._id}`,
        data,
        config
      );
      if (!res) alert("Something went wrong");
      alert("Canceled the ticket");
      window.location.href = "/user/booked-flights";
    } catch (err) {
      console.log("Something went wrong");
    }
  };
  return (
    booking &&
    booking.flightId &&
    booking.flightId._id && (
      <div className="ticket-card p-3 my-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="lead">From: </p>
            <h1>{booking.flightId.fromLocation}</h1>
          </div>
          <div className="dotted-line"></div>
          <div className="text-info">
            <i className="fas fa-plane fa-3x  "></i>
          </div>
          <div className="dotted-line"></div>
          <div>
            <p className="lead text-right">To: </p>
            <h1>{booking.flightId.toLocation}</h1>
          </div>
        </div>
        <hr className="my-2" />
        <div className="d-flex justify-content-between align-items-end">
          <h3 className="">{booking.guestCount} Guests</h3>
          <h3 className="lead">{booking.classType} Class</h3>
          <div className="d-flex align-items-end">
            <h1 className="display-4 text-info">
              total: ${booking.flightId.price * booking.guestCount}/-
            </h1>
            <p className="lead text-right">
              <i>via {booking.payingOption}</i>
            </p>
          </div>
        </div>
        {!hideCancelButton && (
          <div className="d-flex justify-content-end">
            <button
              className="mt-4 btn btn-danger btn-lg"
              onClick={handleCancelFlight}
            >
              Cancel Flight
            </button>
          </div>
        )}
      </div>
    )
  );
}

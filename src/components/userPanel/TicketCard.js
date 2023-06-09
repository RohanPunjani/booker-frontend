import React, { useState, useEffect } from "react";
import BookingModal from "./BookingModal";

export default function TicketCard({ flight, user, bookedFlights = [] }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const handleModalView = (val) => {
    bookedFlights.map((f) => {
      if (f.flightId._id === flight._id) {
        setIsBooked(true);
      }
    });
    setModalVisible(val);
  };
  const f_date = new Date(flight.date).toDateString();
  return (
    <div className="ticket-card p-4 mb-3">
      {!isBooked && modalVisible && (
        <BookingModal
          flight={flight}
          user={user}
          handleModalView={handleModalView}
        />
      )}
      <div className="row">
        <div className="col-md-3">
          <p className="lead">From: </p>
          <h1>{flight.fromLocation}</h1>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="dotted-line"></div>
          <div className="text-info">
            <i className="fas fa-plane fa-3x"></i>
          </div>
          <div className="dotted-line"></div>
        </div>
        <div className="col-md-3">
          <p className="lead text-right">To: </p>
          <h1 className="text-right">{flight.toLocation}</h1>
        </div>
      </div>
      <hr className="my-2" />
      <div className="row align-items-center">
        <div className="col-md-4">
          <h1 className="display-4 text-info">${flight.price}</h1>
        </div>
        <div className="col-md-4 text-center">
          <h3 className="lead">{f_date}</h3>
        </div>
        <div className="col-md-4 text-right">
          {!isBooked && (
            <button
              className="btn btn-info btn-lg"
              onClick={() => handleModalView(true)}
            >
              Book Tickets Now
            </button>
          )}
          {isBooked && (
            <button className="btn btn-info btn-lg" disabled>
              Already Booked
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";

export default function BookingModal({ handleModalView, flight, user }) {
  const [guestCount, setGuestCount] = useState(1);
  const [payingOption, setPayingOption] = useState("UPI");
  const [classType, setClassType] = useState("Economy");

  const bookNow = async () => {
    const data = {
      userId: user._id,
      flightId: flight._id,
      guestCount,
      payingOption,
      classType,
      bookingStatus: "booked",
    };
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/book`,
        data,
        {
          headers,
        }
      );
      handleModalView(false);
      return response.data.booking;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const incrementGC = () => {
    setGuestCount((guestCount) => guestCount + 1);
  };

  const decrementGC = () => {
    const newGuestCount = guestCount - 1 <= 0 ? 1 : guestCount - 1;
    setGuestCount(newGuestCount);
  };
  return (
    <div className="booking-container">
      <div
        className="booking-overlay"
        onClick={() => handleModalView(false)}
      ></div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="modal-dialog w-100 h-100" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Booking Form</h5>
              <button
                type="button"
                className="close"
                onClick={() => handleModalView(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="lead">From: </p>
                    <h3>{flight.fromLocation}</h3>
                  </div>
                  <div className="dotted-line"></div>
                  <div>
                    <p className="lead text-right">To: </p>
                    <h3>{flight.toLocation}</h3>
                  </div>
                </div>
                <hr className="my-2" />
                <div className="form-group">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    id="fullName"
                    value={user.fullName}
                    disabled
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Guest Count:</label>
                      <div className="input-group">
                        <span className="input-group-btn">
                          <button
                            className="btn btn-light"
                            type="button"
                            onClick={decrementGC}
                          >
                            <i className="fa fa-minus" aria-hidden="true"></i>
                          </button>
                        </span>
                        <input
                          type="text"
                          className="form-control text-center"
                          name="name"
                          id="name"
                          readOnly
                          placeholder=""
                          aria-label=""
                          value={guestCount}
                        />
                        <button
                          className="btn btn-light"
                          type="button"
                          onClick={incrementGC}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Class Type:</label>
                      <select
                        className="form-control"
                        name="class-type"
                        id="class-type"
                        value={classType}
                        onChange={(e) => setClassType(e.target.value)}
                      >
                        <option value="Economy">Economy</option>
                        <option value="Business">Business</option>
                        <option value="First">First</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Payment Option:</label>
                  <select
                    className="form-control"
                    name="class-type"
                    id="class-type"
                    value={payingOption}
                    onChange={(e) => setPayingOption(e.target.value)}
                  >
                    <option value="UPI">UPI</option>
                    <option value="Net-Banking">Net Banking</option>
                    <option value="Debit-Card">Debit Card</option>
                    <option value="Credit-Card">Credit Card</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleModalView(false)}
              >
                Close
              </button>
              <button type="button" className="btn btn-info" onClick={bookNow}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

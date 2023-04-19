import React, { useState } from "react";
import Layout from "./Layout";
import axios from "axios";

const AddFlight = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [classType, setClassType] = useState("");
  const [token, setToken] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const createFlight = async () => {
    const data = {
      fromLocation,
      toLocation,
      price,
      date,
      classType: classType || "",
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/flight`,
        data
      );
      setMessage(response.data.message);
      setFromLocation("");
      setToLocation("");
      setPrice("");
      setDate("");
      setClassType("");
      setIsError(false);
    } catch (error) {
      setIsError(true);
      if (error.response) {
        setMessage(error.response.data.message);
      } else if (error.errors) {
        error.errors.forEach((err) => console.log(err));
      } else {
        setMessage("Something went wrong", error);
      }
    }
  };

  return (
    <Layout>
      <div className="main-container">
        <div className="container">
          <div className="p-4"></div>
          <h2>Add Flight</h2>
          <div className="p-4"></div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="h-100 d-flex justify-content-center w-50 flex-column align-items-start"
          >
            {message && (
              <div
                onClick={() => setMessage("")}
                style={{ cursor: "pointer" }}
                className={
                  isError
                    ? "card w-100 bg-danger px-4 my-3"
                    : "card w-100 bg-info pt-3 px-4 my-3"
                }
              >
                <p className="lead text-center mb-0 my-2">{message}</p>
              </div>
            )}
            <label>From Location:</label>
            <input
              type="text"
              className="form-control w-100 mb-3"
              value={fromLocation}
              required
              onChange={(e) => setFromLocation(e.target.value)}
            />
            <label>To Location:</label>
            <input
              type="text"
              className="form-control w-100 mb-3"
              value={toLocation}
              required
              onChange={(e) => setToLocation(e.target.value)}
            />
            <label>Price:</label>
            <input
              type="number"
              className="form-control w-100 mb-3"
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>Date:</label>
            <input
              type="date"
              className="form-control w-100 mb-3"
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
            />
            <label>Class Type:</label>
            <select
              className="form-control w-100 mb-3"
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
            >
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First">First</option>
            </select>
            <button
              className="btn btn-success my-4"
              type="submit"
              onClick={createFlight}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddFlight;

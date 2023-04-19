import React, { useState } from "react";
import Layout from "./Layout";
import axios from "axios";

const AddUser = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [token, setToken] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const createUser = async () => {
    const data = {
      email,
      fullName,
      address: address || "",
      mobileNumber: mobileNumber || "",
      password,
      confirmPassword: rePassword,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        data
      );
      setMessage(response.data.message);
      setFullName("");
      setEmail("");
      setPassword("");
      setRePassword("");
      setMobileNumber("");
      setAddress("");
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
          <h2>Add User</h2>
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
                <p className="lead text-center">{message}</p>
              </div>
            )}
            <label>Full Name:</label>
            <input
              type="text"
              className="form-control w-100 mb-3"
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
            />
            <label>Email:</label>
            <input
              type="email"
              className="form-control w-100 mb-3"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password:</label>
            <input
              type="password"
              className="form-control w-100 mb-3"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Confirm Password:</label>
            <input
              type="password"
              className="form-control w-100 mb-3"
              value={rePassword}
              required
              onChange={(e) => setRePassword(e.target.value)}
            />
            <label>Mobile Number:</label>
            <input
              type="number"
              className="form-control w-100 mb-3"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <label>Address:</label>
            <textarea
              className="form-control"
              name=""
              id=""
              rows="3"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
            <button
              className="btn btn-success my-4"
              type="submit"
              onClick={createUser}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddUser;

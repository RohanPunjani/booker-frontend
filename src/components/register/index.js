import React, { useState } from "react";
import "./style.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [token, setToken] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const registerHandler = async () => {
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
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      setIsError(false);
      window.location.href = "/";
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
    <div
      className="main-container"
      style={{
        height: "100vh",
        background:
          "url(https://images6.alphacoders.com/793/thumb-1920-793657.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div className="h-100">
        <div className="h-100 d-flex justify-content-end">
          <div
            className="h-100 text-white p-4 w-25"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,.8))",
            }}
          >
            <form
              onSubmit={(e) => e.preventDefault()}
              className="h-100 d-flex justify-content-center flex-column align-items-start"
            >
              <div className="display-4 my-4 py-4">Register</div>
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
              <input
                type="text"
                className="form-control w-100 mb-3"
                placeholder="Full Name"
                value={fullName}
                required
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="email"
                className="form-control w-100 mb-3"
                placeholder="Email Address"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control w-100 mb-3"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="form-control w-100 mb-3"
                placeholder="Re-enter Password"
                value={rePassword}
                required
                onChange={(e) => setRePassword(e.target.value)}
              />
              <input
                type="number"
                className="form-control w-100 mb-3"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <textarea
                className="form-control"
                name=""
                id=""
                placeholder="Address"
                rows="3"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
              <button
                className="btn btn-success my-4"
                type="submit"
                onClick={registerHandler}
              >
                Create
              </button>
              <Link to="/login">
                <p className="text-warning lead">Already have an account?</p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

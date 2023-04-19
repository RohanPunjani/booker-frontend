import React, { useEffect, useState } from "react";
import "./style.css";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (!token) return;
    setToken(tokenFromStorage);
  }, []);

  useEffect(() => {
    const redirectToCorrectPage = () => {
      if (!token) return null;
      const decodedToken = jwt_decode(token, {
        secret: process.env.REACT_APP_SECRET_KEY,
      });
      if (decodedToken.role === "user") {
        window.location.href = "/";
      } else if (decodedToken.role === "admin") {
        window.location.href = "/admin";
      }
    };
    redirectToCorrectPage();
  }, [token]);

  const loginHandler = async () => {
    const data = { email, password };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        data
      );

      setMessage(response.data.message);
      setIsError(false);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
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
            <div className="h-100 d-flex justify-content-center flex-column align-items-start">
              <div className="display-4 my-4 py-4">Login</div>
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
              <button className="btn btn-success my-4" onClick={loginHandler}>
                Login
              </button>
              <Link to="/register">
                <p className="text-warning lead">Create a new account?</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

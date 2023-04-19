import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import AdminPanel from "./components/adminPanel";
import UserPanel from "./components/userPanel";
import Logout from "./components/Logout";
import BookedFlights from "./components/userPanel/BookedFlights";
import CanceledFlights from "./components/userPanel/CanceledFlights";
import AddUser from "./components/adminPanel/AddUser";
import AddFlight from "./components/adminPanel/AddFlight";
import Dashboard from "./components/adminPanel/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<UserPanel />} />
        <Route path="/user/booked-flights" element={<BookedFlights />} />
        <Route path="/user/canceled-flights" element={<CanceledFlights />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/add-user" element={<AddUser />} />
        <Route path="/admin/add-flight" element={<AddFlight />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;

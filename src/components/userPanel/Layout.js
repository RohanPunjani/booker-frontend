import React from "react";
import "./style.css";
import Sidebar from "./SideBar";

function Layout({ children }) {
  return (
    <div className="wrapper">
      <Sidebar />
      <main className="h-100 w-100 bg-light">{children}</main>
    </div>
  );
}

export default Layout;

import React from "react";
import "./style.css";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

function Layout({ children }) {
  return (
    <div className="wrapper">
      <LeftSidebar />
      <main className="h-100 w-100 bg-light">{children}</main>
      <RightSidebar />
    </div>
  );
}

export default Layout;

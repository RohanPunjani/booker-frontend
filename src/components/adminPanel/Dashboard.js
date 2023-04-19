import React from "react";
import Layout from "./Layout";
import UsersList from "./UsersList";

export default function Dashboard() {
  return (
    <Layout>
      <div className="main-container">
        <div className="container">
          <div className="p-4">
            <UsersList />
          </div>
        </div>
      </div>
    </Layout>
  );
}

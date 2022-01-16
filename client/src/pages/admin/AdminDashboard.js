import React from "react";
import AdminNav from "../../components/nav/AdminNav";

const AdminDashboard = () => {
  return (
    <div className="containe-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col">
          <h3>Admin Dashboard</h3>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;

import React from "react";
import AdminNav from "../../components/nav/AdminNav";


const AdminDashboard = () => {
  return (
    <div className="containe-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col-md-6">
          <h1>Admin Dashboard Page</h1>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;

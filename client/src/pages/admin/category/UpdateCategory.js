import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";

const UpdateCategory = () => {
  return (
    <div className="containe-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col">
          <h3> Categoru updatepage</h3>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;

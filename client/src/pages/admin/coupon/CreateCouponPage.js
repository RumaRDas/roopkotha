import React, { useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import {
  getCoupons,
  createCoupon,
  removeCoupon,
} from "../../../functions/coupon";

import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";

const CreateCouponPage = () => {
  const [date, setDate] = useState();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col-md-6">
          <h4>Create Coupon</h4>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;

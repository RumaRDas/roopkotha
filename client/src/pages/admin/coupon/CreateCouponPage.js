import React, { useState, useEffect } from "react";
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
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState();
  const [discount, setDiscount] = useState();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  //redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getCoupons().then((res) => setCoupons(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.table(name, expiry, discount);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        getCoupons().then((res) => setCoupons(res.data));
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => console.log("CREATE COUPON ERROR", err));
  };

  const handleRemove = (couponId) => {
    if (window.confirm("Delet?")) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((res) => {
          getCoupons().then((res) => setCoupons(res.data));
          setLoading(false);
          toast.error(`Coupon  Deleted`);
        })
        .catch((err) => console.log("COUPON DELETE----->", err));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger">Loading ...</h4>
          ) : (
            <h4>Coupon</h4>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Discount %</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Expiry</label>
              <DatePicker
                className="form-control"
                selected={expiry}
                onChange={(date) => setExpiry(date)}
                value={expiry}
                required
              />
            </div>
            <button className="btn btn-block btn-outline-primary"> Save</button>
          </form>
          <br />
          {/* {JSON.stringify(coupons)} */}
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr className="text-center">
                <th className="col-md-4">Name</th>
                <th className="col-md-4">Expiry</th>
                <th className="col-md-4">Discount</th>
                <th className="col-md-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => {
                return (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{new Date(c.expiry).toLocaleDateString()}</td>
                    <td>{c.discount}%</td>
                    <td>
                      <DeleteOutlined
                        className="text-danger pointer"
                        onClick={() => handleRemove(c._id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;

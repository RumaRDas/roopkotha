import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo ";
import { useSelector } from "react-redux";

const Orders = ({ orders, handleStatusChange }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light text-center">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Febric</th>
          <th scope="col">Color</th>
          <th scope="col">Size</th>
          <th scope="col">Count</th>
          <th scope="col">Preorder</th>
          <th scope="col">OrderedBy</th>
          <th scope="col">Address</th>
          <th scope="col">MobileNo</th>
          <th scope="col">Message</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.name}</b>
            </td>
            <td>$ {p.product.price}</td>
            <td>{p.product.fabric}</td>
            <td>{p.color}</td>
            <td>{p.size}</td>
            <td>{p.count}</td>
            <td>
              {p.product.preorder === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
            <td>{order.orderedBy.name}</td>
            <td>{order.orderedBy.address}</td>
            <td>{order.orderedBy.mobileNo}</td>
            <td>{order.orderedBy.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className="row pb-5">
          <div className="btn btn-block bg-light">
            <ShowPaymentInfo order={order} showStatus={false} />
            <div className="row">
              <div className="col-md-3">Delivery Status</div>
              <div className="col-md-9">
                <select
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="form-control"
                  defaultValue={order.orderStatus}
                  name="status"
                >
                  <option value="Not Processed"> Not Processed</option>
                  <option value="Cash On Delivery">Cash on Delivery</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
          {showOrderInTable(order)}
        </div>
      ))}
    </>
  );
};

export default Orders;

import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import ShowPaymentInfo  from '../../components/cards/ShowPaymentInfo '
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";

const History = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
     // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light text-center">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Fabric</th>
          <th scope="col">Color</th>
          <th scope="col">Size</th>
          <th scope="col">Count</th>
          <th scope="col">Preorder</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );

  //for PDF Link Download
  const showDownloadLink = (order) => {
    return (
      <PDFDownloadLink
        document={<Invoice order={order} />}
        fileName="invoice.pdf"
        className="btn btn-sm btn-block btn-outline-primary"
      >
        Download PDF
      </PDFDownloadLink>
    );
  };
  const showEachOrders = () =>
    orders.reverse().map((order, i) => (
      <div className="m-5 p-3 card" key={i}>
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">{showDownloadLink(order)}</div>
        </div>
      </div>
    ));

  return (
    <div className="containe-fluid">
      <div className="row">
        <div className="col-md-3">
          <UserNav />
        </div>
        <div className="col-md-6 text-center">
          <h4>
            {orders.length > 0
              ? " User purchase orders "
              : " No purchase orders "}
          </h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};
export default History;

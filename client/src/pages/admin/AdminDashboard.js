import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getPruductsByCount } from "../../functions/product";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getPruductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div className="containe-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col-md-6">
          {loading ? (
            <h4 className="text-danger">Loading ...</h4>
          ) : (
            <h3>Product List</h3>
          )}
          <div className="col">{JSON.stringify(products)}</div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;

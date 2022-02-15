import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { removeWishlist, getWishlist } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    getWishlist(user.token).then((res) => {
      console.log("WISHLIST---->", res.data.wishlist);
      setWishlist(res.data.wishlist);
    });
  };
  const handleRemove = (productId) => {
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });
  };
  return (
    <div className="containe-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-10">
          <h4>WishList</h4>
          {wishlist.map((p) => {
            return (
              <div key={p._id} className="alert alert-secondary">
                <Link to={`/product/${p.slug}`}>{p.title}</Link>
                <span
                  className="btn btn-sm float-right"
                  onClick={() => handleRemove(p._id)}
                >
                  <DeleteOutlined className="text-danger" />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default WishList;

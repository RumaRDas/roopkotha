import React from "react";
import UserNav from "../../components/nav/UserNav";
const WishList = () => {
  return (
    <div className="containe-fluid">
      <div className="row">
      <div className="col-md-3">
          <UserNav />
        </div>
        <div className="col-md-6">
          <h1>User Wishlist page</h1>
        </div>
      </div>
    </div>
  );
};
export default WishList;

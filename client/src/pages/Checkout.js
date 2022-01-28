import React from "react";

const Checkout = () => {
  const saveAddressToDb = () => {
    //
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h4> Delivery Address</h4>
          <br />
          <br />
          textarea
          <br />
          <button
            className="btn btn-primary mt-2 btn-block"
            onClick={saveAddressToDb}
          >
            Save
          </button>
          <hr />
          <h4> Got Coupon?</h4>
          <br />
          coupon input and apply button
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p>Products X</p>
          <hr />
          <p> List of Products</p>
          <hr />
          <p>Cart Total: $x</p>
          <div className="row">
            <div className="col-md-6">
              <button className="btn btn-primary mt-2 btn-block">
                Place Order
              </button>
            </div>
            <div className="col-md-6">
              <button className="btn btn-danger mt-2 btn-block">
                Empty cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  creatCashOrderForUser,
} from "../functions/user";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("User Cart Res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    //remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    //remove from backend
    emptyUserCart(user.token).then((res) => {
      // console.log(res)
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is empty. Contniue shopping ");
    });
  };
  const saveAddressToDb = () => {
    // const address = editor.getText();
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };
  const applyDiscountCoupon = () => {
    console.log("SendCoupon to backend", coupon);
    //apply Coupon
    applyCoupon(user.token, coupon).then((res) => {
      console.log("Response on coupon apply", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        //update redux coupon appliedn true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      //error
      if (res.data.err) {
        setDiscountError(res.data.err);
        //update redux coupon applied
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };
  const showAddress = () => {
    return (
      <>
        <ReactQuill theme={"snow"} value={address} onChange={setAddress} />
        <br />
        <button
          className="btn btn-primary mt-2 btn-block"
          onClick={saveAddressToDb}
        >
          Save
        </button>
      </>
    );
  };
  const showProductSummary = () => {
    return (
      <div>
        {products.map((p, i) => (
          <div key={i}>
            <p>
              {/* getting user prefered color */}
              {p.product.title}({p.color}) X {p.count} = $
              {p.product.price * p.count}
            </p>
          </div>
        ))}
      </div>
    );
  };
  const showApplyCoupon = () => {
    return (
      <>
        <input
          type="text"
          className="form-control"
          onChange={(e) => {
            setCoupon(e.target.value);
            setDiscountError("");
          }}
          value={coupon}
        />
        <button
          className="btn btn-outline-success btn-block"
          onClick={applyDiscountCoupon}
        >
          Apply
        </button>
      </>
    );
  };

  const createCashOrder = () => {
    //
    creatCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log("CASH ON ORDER--->", res);
      //empty  cart from redux, localStorage, reset coupon, resetCOD, redirect
      if (res.data.ok) {
        //empty localstorage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        //empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        //empty reduxcoupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        //empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });

        // empty cart on backend
        emptyUserCart(user.token);
        //redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h4> Delivery Address</h4>
          <br />
          <br />
          {showAddress()}
          <hr />
          <h4> Got Coupon?</h4>
          {showApplyCoupon()}
          <br />
          {discountError && <p className="bg-danger p-2">{discountError}</p>}
        </div>

        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p>Products --- {products.length}</p>
          <hr />
          {showProductSummary()}
          <hr />
          <p>Cart Total: $ {total}</p>
          {totalAfterDiscount > 0 && (
            <p className="text-danger p-2">
              {" "}
              Discount applied Total payable: $ {totalAfterDiscount}
            </p>
          )}
          <div className="row">
            <div className="col-md-6">
              {COD ? (
                <button
                  className="btn btn-primary mt-2 btn-block"
                  disabled={!addressSaved || !products.length}
                  onClick={createCashOrder}
                >
                  Place Order
                </button>
              ) : (
                <button
                  className="btn btn-primary mt-2 btn-block"
                  disabled={!addressSaved || !products.length}
                  onClick={() => history.push("/payment")}
                >
                  Place Order
                </button>
              )}
            </div>
            <div className="col-md-6">
              <button
                className="btn btn-danger mt-2 btn-block"
                onClick={emptyCart}
                disabled={!products.length}
              >
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

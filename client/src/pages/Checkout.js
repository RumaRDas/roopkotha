import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, emptyUserCart } from "../functions/user";
import { toast } from "react-toastify";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const { user } = useSelector((state) => ({ ...state }));
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
      toast.success("Cart is empty. Contniue shopping ");
    });
  };
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
          <p>Products {products.length}</p>
          <hr />

          <p>
            {products.map((p, i) => (
              <div key={i}>
                <p>
                  {/* getting user prefered color */}
                  {p.product.title}({p.color}) X {p.count} = $
                  {p.product.price * p.count}
                </p>
              </div>
            ))}
          </p>
          <hr />
          <p>Cart Total: $ {total}</p>
          <div className="row">
            <div className="col-md-6">
              <button className="btn btn-primary mt-2 btn-block">
                Place Order
              </button>
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

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCartInCheckout from '../components/cards/ProductCartInCheckout'
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    //console.log("CART----->", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((error) => {
        console.log("CART SAVE ERROR", error);
      });
  };

  const saveCashOrderToDb = () => {
    //console.log("CART----->", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((error) => {
        console.log("CART SAVE ERROR", error);
      });
  };

  const showCartItems = () => {
    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Fabric</th>
            <th scope="col">Color</th>
            <th scope="col">Size</th>
            <th scope="col">Count</th>

            <th scope="col">Preorder</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        {cart.map((p) => (
          <ProductCartInCheckout key={p._id} p={p} />
        ))}
      </table>
    );
  };
  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <h4>Cart / {cart.length} Product</h4>
      </div>
      <div className="row">
        <div className="col-md-8">
          {!cart.length ? (
            <h4 className="text-center pt-5">
              No Products in cart.<Link to="/shop">continu shopping</Link>
            </h4>
          ) : (
            // <h4>{JSON.stringify(cart)}</h4>
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4 className="text-primary"> Order Summary</h4>
          <hr />
          <p> Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = $ {c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total : <b>$ {getTotal()}</b>
          <hr />
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                className="btn btn-sm btn-primary mt-2"
                disabled={!cart.length}
              >
                Proceed to Checkout
              </button>
              <br />
              <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-warning mt-2"
                disabled={!cart.length}
              >
                Pay cash on Delivery
              </button>
            </>
          ) : (
            <button className="btn btn-sm  mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

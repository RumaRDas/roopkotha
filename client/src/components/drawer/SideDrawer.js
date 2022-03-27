import React from "react";
import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.jpg";

const SideDrawer = ({ children }) => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  const imageStyle = {
    width: "100%",
    height: "100px",
    objectFit: "cover",
  };
  return (
    <Drawer
      className="text-center"
      title={`Cart / ${cart.length} Products`}
      placement="right"
      // closable={false}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div className="row" key={p._id}>
          <div className="col">
            {p.images[0] ? (
              <>
                <img src={p.images[0].url} style={imageStyle} alt="" />
                <p className="text-center bg-secondary text-light">
                  {p.name} X {p.count}
                </p>
                <p className="text-center text-dark">Count: {p.count}</p>
              </>
            ) : (
              <>
                <img src={laptop} style={imageStyle} alt="" />
                <p className="text-center bg-secondary text-loght">
                  {p.name} X {p.count}
                </p>
                <p className="text-center text-dark">Count: {p.count}</p>
              </>
            )}
          </div>
        </div>
      ))}
      <Link to="/cart">
        <button
          className="text-center btn btn-primary btn-raised  btn-block"
          onClick={() =>
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            })
          }
        >
          Go To Cart
        </button>{" "}
      </Link>
      <br />
      <Link to="/shop">
        <button
          className="text-center btn btn-info btn-raised  btn-block"
          onClick={() =>
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            })
          }
        >
          Go back to shop
        </button>{" "}
      </Link>
    </Drawer>
  );
 
};

export default SideDrawer;

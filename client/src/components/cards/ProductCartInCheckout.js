import React, { useState } from "react";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.jpg";
import{useDispatch} from 'react-redux'
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const ProductCartInCheckout = ({ p }) => {
  const [colors, setColors] = useState([
    "White",
    "Black",
    "Red",
    "Pink",
    "Blue",
    "Green",
    "Yellow",
    "Others",
  ]);
  const [sizes, setSizes] = useState("");

  const dispatch = useDispatch();

  //Products Color Changes
  const handleColorChange = (e) => {
    //  console.log("ColorChanged", e.target.value);
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });
      //    console.log("cartUpdate Color----->", cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      //add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };
  //adding no of products purchase
  const handleCountChange = (e) => {
    //console.log("PRODUCT QUENTITY------->", p.quantity);

    const count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quentity : ${p.quantity}`);
      return;
    }
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };
  //Products size Changes
  const handleSizeChange = (e) => {
    //  console.log("ColorChanged", e.target.value);
    const size = e.target.value;
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].size = size;
        }
      });
      //    console.log("cartUpdate Color----->", cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      //add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };
  //Removing products
  const handleRemove = () => {
    //  console.log(p._id, "<----to REMOVE");
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });
      //    console.log("cartUpdate Color----->", cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      //add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <>
      <tbody>
        <tr>
          <td className=" text-center">
            <div style={{ width: "100px", height: "auto" }}>
              {p.images.length ? (
                <ModalImage small={p.images[0].url} large={p.images[0].url} />
              ) : (
                <ModalImage small={laptop} large={laptop} />
              )}
            </div>
          </td>
          <td className=" text-center">{p.name}</td>
          <td className=" text-center">$ {p.price}</td>
          <td className=" text-center">{p.fabric}</td>
          <td className=" text-center">
            <select
              name="color"
              className="form-control"
              onChange={handleColorChange}
            >
              {p.color ? (
                <option value={p.color}>{p.color}</option>
              ) : (
                <option>Select</option>
              )}
              {colors
                .filter((c) => c !== p.color) //using filter not to repeat the same color
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </td>
          <td className=" text-center">
            <select
              name="size"
              className="form-control"
              onChange={handleSizeChange}
            >
              {p.size ? (
                <option value={p.size}>{p.size}</option>
              ) : (
                <option>Select</option>
              )}
              {p.sizes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </td>
          <td className="text-center" style={{ width: "100px" }}>
            <input
              type="number"
              className="form-control"
              value={p.count}
              onChange={handleCountChange}
            />
          </td>
          <td className=" text-center">
            {p.shipping === "Yes" ? (
              <CheckCircleOutlined className="text-success " />
            ) : (
              <CloseCircleOutlined className="text-danger" />
            )}
          </td>
          <td className=" text-center">
            <CloseOutlined
              onClick={handleRemove}
              className="text-danger pointer"
            />
          </td>
        </tr>
      </tbody>
    </>
  );
};
export default ProductCartInCheckout;

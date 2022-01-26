import React, { useState } from "react";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.jpg";
import{useDispatch} from 'react-redux'

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

  const dispatch= useDispatch()
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
  localStorage.setItem('cart', JSON.stringify(cart))
    //add to redux state
    dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });

    }
  };
  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>$ {p.price}</td>
        <td>{p.type}</td>
        <td>
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
        <td>{p.count}</td>
        <td>Shipping</td>
        <td>Delet icon</td>
      </tr>
    </tbody>
  );
};
export default ProductCartInCheckout;

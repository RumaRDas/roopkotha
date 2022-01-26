import React from "react";

const ProductCartInCheckout = ({ p }) => {
  return (
    <tbody>
      <tr>
        <td>Image</td>
        <td>{p.title}</td>
        <td>$ {p.price}</td>
        <td>{p.type}</td>
        <td>{p.color}</td>
        <td>{p.count}</td>
        <td>Shipping</td>
        <td>Delet icon</td>
      </tr>
    </tbody>
  );
};
export default ProductCartInCheckout;

import React from "react";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.jpg";

const ProductCartInCheckout = ({ p }) => {
  return (
    <tbody>
      <tr>
        <td>
          <div>
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
        <td>{p.color}</td>
        <td>{p.count}</td>
        <td>Shipping</td>
        <td>Delet icon</td>
      </tr>
    </tbody>
  );
};
export default ProductCartInCheckout;

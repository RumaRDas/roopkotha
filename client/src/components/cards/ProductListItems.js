import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const {
    price,
    quantity,
    category,
    subcates,
    preorder,
    sold,
    colors,
    fabrics,
    sizes,
    fabric,
    color,
    size,
  } = product;

  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price{" "}
        <span className="label label-default label-pill pull-xs-right float-end">
          $ {price}
        </span>
      </li>

      {category && (
        <li className="list-group-item">
          Category{" "}
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right float-end"
          >
            {category.name}
          </Link>
        </li>
      )}

      {subcates && (
        <li className="list-group-item">
          Sub Category
          {subcates.map((s) => (
            <Link
              to={`/subcat/${s.slug}`}
              key={s._id}
              className="label label-default label-pill pull-xs-right float-end ml-5 border-left border-info pl-3"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item">
        Preorder only
        {preorder ? (
          <span className="label label-default label-pill pull-xs-right float-end">
            {preorder}
          </span>
        ) : (
          <p className="label label-default label-pill pull-xs-right float-end">
            Unknown
          </p>
        )}
      </li>

      <li className="list-group-item">
        Color{" "}
        <span className="label label-default label-pill pull-xs-right float-end">
          {color}
        </span>
      </li>
      <li className="list-group-item">
        Fabric{" "}
        <span className="label label-default label-pill pull-xs-right float-end">
          {fabric}
        </span>
      </li>

      {sizes && (
        <li className="list-group-item">
          Size
          {sizes.map((s, i) => (
            <span
              key={i}
              className="label label-default label-pill pull-xs-right float-end ml-5 border-left border-warning pl-3"
            >
              {s}
            </span>
          ))}
        </li>
      )}
      <li className="list-group-item">
        Available{" "}
        <span className="label label-default label-pill pull-xs-right float-end">
          {quantity}
        </span>
      </li>
      <li className="list-group-item">
        Sold{" "}
        <span className="label label-default label-pill pull-xs-right float-end">
          {sold}
        </span>
      </li>
    </ul>
  );
};
export default ProductListItems;

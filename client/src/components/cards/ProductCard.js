import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import laptop from "../../images/laptop.jpg";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
// import StarRatings from "react-star-ratings";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  //redux
  const dispatch = useDispatch();

  const { user, cart, drawer } = useSelector((sate) => ({ ...sate }));

  const handleAddToCart = () => {
    //create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      //if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      //push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      //remove duplicates
      const unique = _.uniqWith(cart, _.isEqual);
      //save to localstorage
      // console.log("UNIQUE---->", unique);
      localStorage.setItem("cart", JSON.stringify(unique));
      //show tooltip
      setTooltip("Added");

      //add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      //show cart item in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  //destructure
  const { images, title, description, slug, price } = product;
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center  pt-1 pb3"> No rating yet</div>
      )}
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
            alt=""
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-info" />
            <br />
            View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className="text-success" />
              <br />
              Add to Cart
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title}   --- Price: $${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};
export default ProductCard;

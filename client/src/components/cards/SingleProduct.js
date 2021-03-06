import React, { useState } from "react";
import { Card, Tabs,Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Laptop from "../../images/laptop.jpg";
import ProductListItems from "./ProductListItems";
import StarRatings from "react-star-ratings";
import { Carousel } from "react-responsive-carousel";
import RatingModal from "../starmodal/RatingModal";
import { showAverage } from "../../functions/rating";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { addToWishList } from "../../functions/user";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
const { Meta } = Card;
const { TabPane } = Tabs;

//This is children component of product page
const SingleProduct = ({ product, onStarClick, star }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  const { title, name, images, description, _id } = product;

  const dispatch = useDispatch();
  const history = useHistory();
  const { user, cart } = useSelector((sate) => ({ ...sate }));

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

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishList(product._id, user.token).then((res) => {
      //    console.log("ADD TO WISHLIST------>", res.data);
      toast.success("Added to wishlist");
      history.push("/user/wishlist");
    });
  };
  return (
    <>
      <div className="col-md-6">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card
            cover={<img src={Laptop} className="mb-3 card-image" alt="" />}
          ></Card>
        )}
        <Tabs type="cads" style={{ color: "#dca04f" }}>
          <TabPane tab="Descriptin" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on xxxxxxxxxxxx to learn more about this product
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-6">
        <h1 className=" p-3" style={{ backgroundColor: "#dca04f" }}>
          {title}
        </h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center  pt-1 pb3" style={{ color: "#dca04f" }}>
            {" "}
            No rating yet
          </div>
        )}
        <Card
          actions={[
            <Tooltip Name={tooltip}>
              <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                <ShoppingCartOutlined className="text-success" />
                <br />
                {product.quantity < 1 ? (
                  <p className="text-danger">Out of Stock</p>
                ) : (
                  "Add to Cart"
                )}
              </a>
            </Tooltip>,

            <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" />
              <br />
              Add to wishlist
            </a>,
            <RatingModal>
              <StarRatings
                name={_id}
                numberOfStars={5}
                changeRating={onStarClick}
                rating={star}
                starRatedColor="red"
                isSelectable={true}
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};
export default SingleProduct;

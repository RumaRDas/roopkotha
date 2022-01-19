import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Laptop from "../../images/laptop.jpg";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
const { Meta } = Card;

const SingleProduct = ({ product }) => {
  const {
    title,
    description,
    price,
    quantity,
    category,
    subcates,
    shipping,
    images,
    colors,
    types,
    color,
    type,
  } = product;
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
      </div>
      <div className="col-md-6">
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" />
              <br />
              Add to Cart
            </>,
            <Link to="/" className="text-info">
              <br />
              Add to Wishlist
            </Link>,
          ]}
        >
          <Meta title={title} description={description} />
          <p>
            price/category/subs/shipping/color/brand/quentity/availabel/sold
          </p>
        </Card>
      </div>
    </>
  );
};
export default SingleProduct;

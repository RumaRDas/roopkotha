import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Laptop from "../../images/laptop.jpg";
import ProductListItems from "./ProductListItems";
import StarRatings from "react-star-ratings";
import { Carousel } from "react-responsive-carousel";
import RatingModal from "../starmodal/RatingModal";
import { showAverage } from "../../functions/rating";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
const { Meta } = Card;
const { TabPane } = Tabs;

//This is children component of product page
const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;
  
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
        <Tabs type="cads">
          <TabPane tab="Descriptin" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on xxxxxxxxxxxx to learn more about this product
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-6">
        <h1 className="bg-info  p-3">{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center  pt-1 pb3"> No rating yet</div>
        )}
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

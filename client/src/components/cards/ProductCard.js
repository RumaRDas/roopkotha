import React from "react";
import { Card } from "antd";
import laptop from "../../images/laptop.jpg";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
 import { showAverage}from '../../functions/rating'
// import StarRatings from "react-star-ratings";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  //destructure
  const { images, title, description, slug,  } = product;
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
        <>
          <ShoppingCartOutlined className="text-success" />
          <br />
          Add to Cart
        </>,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
    </>
  );
};
export default ProductCard;

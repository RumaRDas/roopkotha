import React, { useEffect, useState } from "react";
import { getProduct, productStar, getRelated } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import ProductCard from "../components/cards/ProductCard";
import { useSelector } from "react-redux";
import RelatedProducts from "../components/home/RelatedProducts";
import "./style.css";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]); // when slag change useeffect changes

  useEffect(() => {
    //this useEffect for component mount with user and his previous rating
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); //current user star
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      //  console.log(res.data);
      setProduct(res.data);

      //load related aswell
      // getRelated(res.data._id, page).then((res) => {
      //   setRelated(res.data);
      // });
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    //  console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      console.log("Rating Clicked", res.data);
      loadSingleProduct(); //if you want to updated rating in real time
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row pt-4 pb-5">
          <SingleProduct
            product={product}
            onStarClick={onStarClick}
            star={star}
          />
        </div>
        <div className="  productBack">
          <div className="productrBackHover">
            <div className="container bg-light  ">
              <h3
                className="text-center p-5 mb-3   "
                style={{ color: "#a38051", fontSize: "30px" }}
              >
                Related Products
              </h3>

              <RelatedProducts slug={slug} />
            </div>

            {/* {------} */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;

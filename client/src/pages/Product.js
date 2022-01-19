import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]); // when slag change useeffect changes

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      console.log(res.data);
      setProduct(res.data);
    });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row pt-4">
          <SingleProduct product={product} />
        </div>

        <div className="row">
          <div>
            <h3>Related products</h3>
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;

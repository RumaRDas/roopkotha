import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";

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
    <div>
      <h3>Product Detailes</h3>
      {JSON.stringify(product)}
    </div>
  );
};
export default Product;

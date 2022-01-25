import React, { useEffect, useState } from "react";
import { getSubCate } from "../../functions/subcate";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";

const SubCateHome = ({ match }) => {
  const [subcate, setSubcate] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    subProducts(slug);
  }, []);

  const subProducts = (slug) =>
    getSubCate(slug).then((res) => {
      console.log("NEW SUBCATEGORY :", JSON.stringify(res.data, null, 4));
      setSubcate(res.data.subcate);
      setProducts(res.data.products);
      setLoading(false);
    });

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading....
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length} Products in
              <span className="text-info"> {subcate.name} </span> Sub Category
            </h4>
          )}
        </div>
      </div>
      <div className="row">
        {products.map((p) => {
          return (
            <div className="col-md-4" key={p._id}>
              <ProductCard product={p} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubCateHome;

import React, { useEffect, useState } from "react";
import {
  getProduct,
  getProductsCount,
  getRelated,
} from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";
import { Carousel } from "react-responsive-carousel";
const RelatedProducts = ({ match, slug }) => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [related, setRelated] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadRelatedProduct();
  }, []);

  const loadRelatedProduct = () => {
    getProduct(slug).then((res) => {
      getRelated(res.data._id).then((res) => {
        setRelated(res.data);
        setLoading(false);
      });
    });
  };
  return (
    <>
      {/* {JSON.stringify(productsCount)} */}
      <div className="container">
        <div className="row">
          {related.length ? (
            related.map((r) => {
              return (
                <div key={r._id} className="col-md-4">
                  <ProductCard product={r} />
                </div>
              );
            })
          ) : (
            <div className="text-center col">No Product Found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default RelatedProducts;

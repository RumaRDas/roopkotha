import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { useSelector, useDispatch, createSelectorHook } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider } from "antd";
import { DollarOutlined } from "@ant-design/icons";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const dispatch = useDispatch();

  useEffect(() => {
    loadAllProducts();
  }, []);
  //
  //1.load products by default shop on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };
  //2.load products on userSearch input
  useEffect(() => {
    //for delaying request to backend for few milisecends using setTimeout()
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  const fetchProducts = (arg) => {
    // console.log("load products on userSearch input", text);
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };
  // 3.load products based on price range

  useEffect(() => {
    console.log("Ok t reques :");
    fetchProductByPrice({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const fetchProductByPrice = (arg) => {
    //
    if (ok) {
      fetchProductsByFilter(arg).then((res) => {
        setProducts(res.data);
        setLoading(false);
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-3">
          <h4>Search/Filter</h4>
          <hr />
          <Menu mode="inline" defaultOpenKeys={["1", "2"]}>
            <SubMenu
              key="1"
              title={
                <span className="h6 text-info">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  max="80"
                  onChange={handleSlider}
                />
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9 pt-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-info">Products</h4>
          )}
          {products.length < 1 && <h5>No products Found</h5>}
          <div className="row">
            {products.map((p) => (
              <div key={p._id} className="col-md-4">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

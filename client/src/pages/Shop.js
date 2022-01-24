import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { useSelector, useDispatch, createSelectorHook } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox } from "antd";
import { DollarOutlined, DownSquareOutlined } from "@ant-design/icons";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);

  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesChecked, setCategoriesChecked] = useState([]);

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const dispatch = useDispatch();

  useEffect(() => {
    loadAllProducts();
    fetchCategories();
  }, []);
  //
  //1.load products by default shop on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  const fetchCategories = () => {
    getCategories().then((res) => setCategories(res.data));
    //   console.log(categories);
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
  //.4 Load products based on categories
  //show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoriesChecked.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));
  const handleCheck = (e) => {
    // console.log(e.target.value);
    const inTheState = [...categoriesChecked];
    const justChecked = e.target.value;
    const foundIntheState = inTheState.indexOf(justChecked);
    // indexof Method -->if not found returns -1  else return index
    if (foundIntheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundIntheState, 1);
    }
    setCategoriesChecked(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-3">
          <h4>Search/Filter</h4>
          <hr />
          <Menu mode="inline" defaultOpenKeys={["1", "2"]}>
            {/* Price */}
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
            {/* Category */}
            <SubMenu
              key="2"
              title={
                <span className="h6 text-info">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div>
                {/* {JSON.stringify(categories)} */}
                {showCategories()}
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

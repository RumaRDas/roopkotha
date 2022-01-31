import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubCates } from "../functions/subcate";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Star from "../components/forms/Star";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);

  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesChecked, setCategoriesChecked] = useState([]);
  const [subcates, setSubcates] = useState([]);
  const [subcate, setSubcate] = useState("");
  const [star, setStar] = useState("");
  const [types, setTypes] = useState([
    "Cotton",
    "Muslin",
    "Silk",
    "Katan",
    "Gorgette",
    "Organza",
    "Casula",
    "PartyWare",
    "Others",
  ]);
  const [type, setType] = useState("");
  const [colors, setColors] = useState([
    "White",
    "Black",
    "Red",
    "Pink",
    "Blue",
    "Green",
    "Yellow",
    "Others",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const dispatch = useDispatch();

  useEffect(() => {
    loadAllProducts();
    fetchCategories();
    fetchSubcates();
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

  const fetchSubcates = () => {
    getSubCates().then((res) => setSubcates(res.data));
    // console.log("SUBCATES ------>", subcates);
  };
  //2.load products on userSearch input
  useEffect(() => {
    //for delaying request to backend for few milisecends using setTimeout()
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if(!text){
        loadAllProducts()
      }
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
    setCategoriesChecked([]);
    setPrice(value);
    setStar("");
    setSubcate("");
    setType("");
    setColor("");
    setShipping("");
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

  //Handle check for categories
  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setSubcate("");
    setStar("");
    setType("");
    setColor("");
    setShipping("");
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

  //.5 show Products by star ratings
  const handleStarClick = (num) => {
    // console.log("RATINGS----->", num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setSubcate("");
    setCategoriesChecked([]);
    setStar(num);
    setType("");
    setColor("");
    setShipping("");
    fetchProducts({ stars: num });
  };
  const showStars = () => (
    <div className="pr-4 pl-4 pb-3 pt-3">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  //.6 show Products by subCategories

  const showsubCates = () =>
    subcates.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSubcate(s)}
        className="p-3 m-1 badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSubcate = (sub) => {
    // console.log("Sub", sub);
    setSubcate(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setType("");
    setCategoriesChecked([]);
    setStar("");
    setColor("");
    setShipping("");
    fetchProducts({ subcate: sub });
  };

  //.6 show Products based on type

  const showType = () =>
    types.map((t) => (
      <Radio
        key={t}
        value={t}
        name={t}
        checked={t === type}
        onChange={handleType}
        className="pb-1 pl-1 pr-5 mr-5"
      >
        {t}
      </Radio>
    ));

  const handleType = (e) => {
    // console.log("Sub", sub);
    setType(e.target.value);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setSubcate("");
    setCategoriesChecked([]);
    setStar("");
    setColor("");
    setShipping("");
    fetchProducts({ type: e.target.value });
  };
  //.7 show Products based on Color

  const showColor = () =>
    colors.map((c) => (
      <Radio
        key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-1 pr-5 mr-5"
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    // console.log("Sub", sub);
    setColor(e.target.value);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setSubcate("");
    setCategoriesChecked([]);
    setStar("");
    setType("");
    setShipping("");
    fetchProducts({ color: e.target.value });
  };

  //.8 show Products based on Shipping
  const showShipping = () => {
    return (
      <>
        <Checkbox
          className="pb-2 pl-4 pr-4"
          onChange={handleShippingChange}
          value="Yes"
          checked={shipping === "Yes"}
        >
          Yes
        </Checkbox>
        <Checkbox
          className="pb-2 pl-4 pr-4"
          onChange={handleShippingChange}
          value="No"
          checked={shipping === "No"}
        >
          No
        </Checkbox>
      </>
    );
  };
  const handleShippingChange = (e) => {
    // console.log("Sub", sub);
    setShipping(e.target.value);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setSubcate("");
    setCategoriesChecked([]);
    setStar("");
    setType("");
    setColor("");
    fetchProducts({ shipping: e.target.value });
  };
  //return
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-3">
          <h4>Search/Filter</h4>
          <hr />
          <Menu
            mode="inline"
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
          >
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
                <span className="h6 text-info pb-5">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5">
                {/* {JSON.stringify(categories)} */}
                {showCategories()}
              </div>
            </SubMenu>
            {/* Sub Category */}
            <SubMenu
              key="3"
              title={
                <span className="h6 text-info pb-5">
                  <DownSquareOutlined /> Sub Categories
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5">
                {/* {JSON.stringify(categories)} */}
                {showsubCates()}
              </div>
            </SubMenu>
            {/* Stars */}
            <SubMenu
              key="4"
              title={
                <span className="h6 text-info">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5">
                {showStars()}
              </div>
            </SubMenu>
            {/* Type*/}
            <SubMenu
              key="5"
              title={
                <span className="h6 text-info pb-5">
                  <DownSquareOutlined /> Type
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5">
                {showType()}
              </div>
            </SubMenu>
            {/* Colors*/}
            <SubMenu
              key="6"
              title={
                <span className="h6 text-info pb-5">
                  <DownSquareOutlined /> Colors
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5">
                {showColor()}
              </div>
            </SubMenu>
            {/* Shipping*/}
            <SubMenu
              key="7"
              title={
                <span className="h6 text-info pb-5">
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5">
                {showShipping()}
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

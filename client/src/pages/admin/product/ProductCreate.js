import React, { useState, useEffect } from "react";

import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { getSubCates } from "../../../functions/subcate.js";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

//for declearing each of state instade one Object
const initialState = {
  title: "",
  name: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subcates: [],
  subcate: [],
  quantity: "",
  preorder: "",
  images: [],
  //  shipping: ["Yes", "No"],
  colors: [
    "White",
    "Black",
    "Red",
    "Pink",
    "Blue",
    "Green",
    "Yellow",
    "Others",
  ],
  fabrics: [
    "Cotton",
    "Muslin",
    "Silk",
    "Katan",
    "Gorgette",
    "Organza",
    "Casula",
    "PartyWare",
    "Others",
  ],
  sizes: [],
  color: "",
  fabric: "",
  size: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [sizeOptions, setSizesOptions] = useState([
    "32",
    "34",
    "36",
    "38",
    "40",
    "42",
    "44",
    "46",
  ]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    //   loadSubCate();
    loadCategories();
  }, []);

  // getting all Categories
  const loadCategories = () =>
    getCategories().then((c) => {
      //  console.log("Category :", c.data);
      setValues({ ...values, categories: c.data });
      // res.json({ categories: res.data });
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        setLoading(false);
        // console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload(); // for geting empty field  for form
      })
      .catch((err) => {
        //   console.log("Product create ERROR", err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
    //
  };
  //for updateing form event change on change
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    // console.log(e.target.name, "----------", e.target.value);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    //  console.log("ClickCategory", e.target.value);
    setValues({ ...values, subcates: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("Option on Category Click", res);
      setSubOptions(res.data);
    });

    setShowSub(true);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>

        <div className="col-md-9">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h3>Product Create Form</h3>
          )}
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
            sizeOptions={sizeOptions}
          />
          {/* {JSON.stringify(values.images)} */}
        </div>
      </div>
    </div>
  );
};
export default ProductCreate;

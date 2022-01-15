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

//for declearing each of state instade one Object
const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subcates: [],
  subcate: [],
  quantity: "",
  images: [],
  //  shipping: ["Yes", "No"],
  colors: ["White", "Black", "Red", "Pink", "Blue", "Green", "Yellow"],
  types: [
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
  color: "",
  type: "",
};
const ProductCreate = ({}) => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [subOptions, setSubOptions] = useState([]);

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

  // // getting all Sub Categories
  // const loadSubCate = () =>
  //   getSubCates().then((s) => {
  //     console.log("SubCatagory:", s.data);
  //     setValues({ ...values, subcates: s.data });
  //     //   res.json({ subcate: res.data });
  //   });

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
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, "----------", e.target.value);
  };
  const handleCategoryChange = (e) => {
    e.preventDefault();
    //  console.log("ClickCategory", e.target.value);
    setValues({ ...values, category: e.target.value });
    getCategorySubs(e.target.value)
      .then((res) => {
        console.log("Option on Category Click", res);
        setSubOptions(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col-md-9">
          <h3>Product Create Form</h3>
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            handleCategoryChange={handleCategoryChange}
          />
          {/* {JSON.stringify(values.categories)} */}
        </div>
      </div>
    </div>
  );
};
export default ProductCreate;

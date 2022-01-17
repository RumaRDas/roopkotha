import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { getSubCates } from "../../../functions/subcate.js";
import { Link } from "react-router-dom";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

import { getPruduct } from "../../../functions/product";

// import { useParams } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subcates: [],
  shipping: "",
  quantity: "",
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
const ProductUpdate = ({ match }) => {
  //state for all values from initialState
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;
  //router
  // let params = useParams();

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getPruduct(slug)
      .then((p) => {
        setValues({ ...values, ...p.data });
        // console.log("SINGLE PRODUCT", p);
      })
      .catch((err) => {});
  };

  // getting all Categories
  const loadCategories = () => {
    getCategories().then((c) => {
      setCategories(c.data);
      //   console.log("Load Categories", c.data);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };
  //for updateing form event change on change
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    //  console.log(e.target.name, "----------", e.target.value);
  };
  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subcates: [], category: e.target.value });
    getCategorySubs(e.target.value)
      .then((res) => {
        //    console.log("Option on Category Click", res);
        setSubOptions(res.data);
      })
      .catch((err) => {});
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        {/* {JSON.stringify(match.params.slug)} */}
        {JSON.stringify(values)}
        <div className="col-md-9">
          <h3>Product UpDate Form</h3>
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};
export default ProductUpdate;

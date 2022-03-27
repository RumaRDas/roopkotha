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

import { getProduct, updateProduct } from "../../../functions/product";

// import { useParams } from "react-router-dom";

const initialState = {
  title: "",
  name: "",
  description: "",
  price: "",
  category: "",
  subcates: [],
  preorder: "",
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
  sizes: ["32", "34", "36", "38", "40", "42", "44", "46"],
  color: "",
  fabric: "",
  size: [],
};
const ProductUpdate = ({ match, history }) => {
  //state for all values from initialState
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
  const [selectedCatogory, setSelectedCatogory] = useState();
  const [arrayOfSizes, setArrayOfSizes] = useState([]);
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
  const { slug } = match.params;
  //router
  // let params = useParams();

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug)
      .then((p) => {
        //Load single Product
        setValues({ ...values, ...p.data });
        // console.log("SINGLE PRODUCT", p);
        //load single product category subs
        getCategorySubs(p.data.category._id).then((res) => {
          setSubOptions(res.data); // onfirst load , show default subcate
        });
        //Prepare array of subcate ids to show as default sub values to select from form
        let arr = [];
        p.data.subcates.map((s) => {
          arr.push(s._id);
        });
        //console.log("ARR :", arr);
        //this is required ant design select option
        setArrayOfSizes((pre) => arr);
        let arrS=[]
        p.data.sizes.map((s) => arrS.push(s))
        setArrayOfSizes((pre)=>arrS)
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
    setLoading(true);
    values.subcates = arrayOfSubIds;
    values.sizes = arrayOfSizes;
    values.category = selectedCatogory ? selectedCatogory : values.category;
    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        // window.alert(`"${res.data.title}" is Updated`);
        // window.location.reload();
        toast.success(`"${res.data.title}" is Updated `);
        history.push("/admin/products");
      })
      .catch((err) => {
        console.log("Product Update ERROR", err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  //for updateing form event change on change
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    //  console.log(e.target.name, "----------", e.target.value);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subcates: [] });
    setSelectedCatogory(e.target.value);
    getCategorySubs(e.target.value).then((res) => {
      //    console.log("Option on Category Click", res);
      setSubOptions(res.data);
    });
    //if user clik=ckes back to the original category
    // ahow its previous sub category in default
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    //clear old sub categoryID
    setArrayOfSubIds([]);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        {/* {JSON.stringify(match.params.slug)} */}

        {/* {JSON.stringify(values)} */}
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
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubIds={arrayOfSubIds}
            setArrayOfSubIds={setArrayOfSubIds}
            selectedCatogory={selectedCatogory}
            arrayOfSizes={arrayOfSizes}
            setArrayOfSizes={setArrayOfSizes}
            sizeOptions={sizeOptions}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};
export default ProductUpdate;

import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

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
const ProductCreate = () => {
  const [values, setValues] = useState(initialState);

  //Destructure useState values
  const {
    title,
    description,
    price,
    quantity,
    categories,
    category,
    subcates,
    subcate,
    images,
    colors,
    types,
    color,
    type,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };
  //for updateing form event change on change
  const handleChange = (e) => {
    //
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col-md-9">
          <h3>Product Create Form</h3>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <lable>Title</lable>
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <lable>Description</lable>
              <textarea
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={handleChange}
              />
              <div className="form-group">
                <lable>Price</lable>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={price}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <lable>Shipping</lable>
                <select
                  name="shipping"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Plese Select</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div className="form-group">
                <lable>Quantity</lable>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  value={quantity}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <lable>Color</lable>
                <select
                  name="color"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Plese Select</option>
                  {colors.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <lable>Type</lable>
                <select
                  name="type"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Plese Select</option>
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button className="btn btn-info btn-block">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ProductCreate;

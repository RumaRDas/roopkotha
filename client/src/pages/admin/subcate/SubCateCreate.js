import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getSubCates,
  removeSubCate,
  createSubCate,
} from "../../../functions/subcate.js";
import { getCategories } from "../../../functions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
//import CategoryForm from "../../../components/forms/CategoryForm";
import SubCategoryForm from "../../../components/forms/SubCategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCateCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subcates, setSubcates] = useState([]);
  //searching and filtering
  const [keyword, setKeyword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSubCate();
    loadCategories();
  }, []);

  // getting all  Categories for creating sub
  const loadCategories = () =>
    getCategories().then((product) => {
      console.log(product.data);
      setCategories(product.data);
    });

  // getting all Sub Categories
  const loadSubCate = () =>
    getSubCates().then((product) => {
      // console.log(product.data);
      setSubcates(product.data);
    });

  //for creating a new category
  const handleSubmit = (e) => {
    e.preventDefault(e);
    // console.log(name);
    setLoading(true);
    createSubCate({ name, parent: category }, user.token)
      .then((res) => {
        // console.log("category_Create:", res.data);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        loadSubCate();
      })
      .catch((err) => {
        //   console.log("category create ERROR", err);
        if (err.response.status === 400) {
          setLoading(false);
          toast.error(err.response.data);
        }
      });
  };

  // for deleting a category
  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSubCate(slug, user.token)
        .then((res) => {
          setLoading(false);
          //  toast.error(`${res.data.name} deleted`);
          loadSubCate();
        })
        .catch((err) => {
          console.log("category delete", err);
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  // for searching
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword); //searching by keywords

  return (
    <div className="containe-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col-md-6">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Create Sub Category</h4>
          )}
          <div className="form-group">
            <label>Parent Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please Select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          {/* <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          /> */}
          <SubCategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {/* adding filter(searched(keyword)) function for searching by keyword */}

          {subcates.filter(searched(keyword)).map((s) => (
            <div className="alert alert-dark" key={s._id}>
              {s.name}
              <span
                className="btn btn-sm float-end"
                onClick={() => handleRemove(s.slug)}
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/subcate/${s.slug}`}>
                <span className="btn btn-sm float-end">
                  <EditOutlined className="text-success" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCateCreate;

import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  //searching and filtering
  const [keyword, setKeyword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  // getting all sategories
  const loadCategories = () =>
    getCategories().then((product) => {
      // console.log(product.data);
      setCategories(product.data);
    });

  //for creating a new category
  const handleSubmit = (e) => {
    e.preventDefault(e);
    // console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log("category_Create:", res.data);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        loadCategories();
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
    // let answer = window.confirm("Delete??");
    // console.log(answer, slug);
    // if (answer) {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          //  toast.error(`${res.data.name} deleted`);
          loadCategories();
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
  const searched = (keyword) => (category) =>
    category.name.toLowerCase().includes(keyword); //searching by keywords

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
            <h4>Create category</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {/* adding filter(searched(keyword)) function for searching by keyword */}
          {categories.filter(searched(keyword)).map((c) => {
            return (
              <div className="alert alert-dark" key={c._id}>
                {c.name}
                <span
                  className="btn btn-sm float-end"
                  onClick={() => handleRemove(c.slug)}
                >
                  <DeleteOutlined className="text-danger" />
                </span>
                <Link to={`/admin/category/${c.slug}`}>
                  <span className="btn btn-sm float-end">
                    <EditOutlined className="text-success" />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;

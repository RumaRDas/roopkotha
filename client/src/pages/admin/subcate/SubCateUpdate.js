import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import UpdateCategoryForm from "../../../components/forms/UpdateCategoryForm ";
import { updateSubCate, getSubCate } from "../../../functions/subcate";

const SubCateUpdate = ({ history, match }) => {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  // dstructuring slug

  useEffect(() => {
    //console.log(match);
    loadSub();
    loadCategories();
  }, []);

  // getting selected subCategory
  const loadSub = () =>
    getSubCate(match.params.slug).then((s) => {
      //console.log(s.data);
      setName(s.data.name);
      setParent(s.data.parent);
    });

  // getting all  Categories for creating sub
  const loadCategories = () =>
    getCategories().then((c) => {
      // console.log(product.data);
      setCategories(c.data);
    });

  //for creating a new Sub category
  const handleSubmit = (e) => {
    e.preventDefault(e);
    // console.log(name);
    setLoading(true);
    updateSubCate(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        // console.log("category_Create:", res.data);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is upated`);
        history.push("/admin/subcate");
      })
      .catch((err) => {
        console.log("category create ERROR", err);
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
      });
  };

  return (
    <div className="containe-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Update Sub Category</h4>
          )}
          <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
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
          <UpdateCategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default SubCateUpdate;

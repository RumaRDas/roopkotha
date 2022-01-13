import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { updateCategory, getCategory } from "../../../functions/category";
import UpdateCategoryForm from "../../../components/forms/UpdateCategoryForm ";

const UpdateCategory = ({ history, match }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  // dstructuring slug

  useEffect(() => {
    //console.log(match);
    loadCategory();
  }, []);

  // getting selected sategory
  const loadCategory = () =>
    getCategory(match.params.slug).then((c) => {
      // console.log(product.data);
      setName(c.data.name);
    });

  //for creating a new category
  const handleSubmit = (e) => {
    e.preventDefault(e);
    // console.log(name);
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        // console.log("category_Create:", res.data);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is upated`);
        history.push("/admin/category");
      })
      .catch((err) => {
        //   console.log("category create ERROR", err);
        if (err.response.status === 400) {
          setLoading(false);
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
            <h4>Update Categry</h4>
          )}
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


export default UpdateCategory;

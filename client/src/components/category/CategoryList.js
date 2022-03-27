import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.jpg";
//import { getCategories } from "../../functions/category";
import { getCategories } from "../../functions/category";
import "./style.css";
const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  const showCategories = () =>
    // categories.map((c) => (
    // <div
    //   key={c._id}
    //   className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
    // >
    //   <Link to={`/category/${c.slug}`}>{c.name}</Link>
    // </div>
    categories.map((c) => (
      <div className=" col-md-4  ">
        <div style={{ background: "#dca04f" }} className=" m-1 p-3 mb-5">
          <div key={c._id} className=" column">
            <img
              src={c.images && c.images.length ? c.images[0].url : laptop}
              style={{ height: "250px", objectFit: "cover" }}
              className="image"
              alt=""
            />

            <div key={c._id} className="textBack">
              <Link to={`/category/${c.slug}`} className="imageText">
                {c.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
      // <div key={c._id} className="col column">
      //   <img
      //     src={c.images && c.images.length ? c.images[0].url : laptop}
      //     style={{ height: "250px", objectFit: "cover" }}
      //     className="image"
      //     alt=""
      //   />

      //   <div key={c._id} className="textBack">
      //     <Link to={`/category/${c.slug}`} className="imageText">
      //       {c.name}
      //     </Link>
      //   </div>
      // </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading ....</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;

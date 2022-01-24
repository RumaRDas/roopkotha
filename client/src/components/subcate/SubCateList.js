import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubCates } from "../../functions/subcate";

const SubCateList = () => {
  const [subcates, setSubcates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    LoadSubcates();
  }, []);

  const LoadSubcates = () => {
    getSubCates().then((res) => {
      console.log("SUB CATEGORIES :", res.data);
      setSubcates(res.data);
      setLoading(false);
    });
  };

  const showSubCates = () => {
    return subcates.map((s) => (
      <div
        key={s._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        {/* {JSON.stringify(s.name)} */}
        <Link to={`/subcate/${s.slug}`}> {s.name}</Link>
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading ....</h4>
        ) : (
          showSubCates()
        )}
      </div>
    </div>
  );
};

export default SubCateList;

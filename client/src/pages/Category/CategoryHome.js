import React, { useEffect, useState } from "react";
import { getCategories } from "../../functions/category";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";

const CategoryHome = ({ match }) => {
  useEffect(() => {}, []);
  return (
    <div className="container">
      <p>{match.params.slug}</p>
    </div>
  );
};

export default CategoryHome;

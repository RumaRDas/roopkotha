import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import Newarrivals from "../components/home/Newarrivals";
import logo from "../images/logo.gif";
import back from "../images/back2.jpg";
import back1 from "../images/back4.jpg";
import BestSold from "../components/home/BestSold";
import CategoryList from "../components/category/CategoryList";
import SubCateList from "../components/subcate/SubCateList";
import "./style.css";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-dark h1 font-weight-bold text-center headerBack ">
        <div className="headerBackHover">
          <img src={logo} alt="logo" style={{ width: "30%" }} />
          <div className="pt-5 ">
            <Jumbotron
              text={["New Arrivals", "Latest Products", "Best Sellers"]}
            />
          </div>
        </div>
      </div>

      <div className="productBack">
        <div className="productrBackHover">
          <div className="container bg-light ">
            <h3
              className="text-center p-5 mb-3   "
              style={{ color: "#a38051", fontSize: "30px" }}
            >
              New Arrivals
            </h3>
            <Newarrivals />
          </div>
        </div>
      </div>
      <div className="productBack ">
        <div className="productrBackHover">
          <div className="container bg-light  ">
            <h3
              className="text-center p-5 mb-3   "
              style={{ color: "#a38051", fontSize: "30px" }}
            >
              Products
            </h3>
            <CategoryList />
          </div>
        </div>
      </div>

      <div className="productBack">
        <div className="productrBackHover">
          <div className="container bg-light">
            <h3
              className="text-center p-5 mb-3   "
              style={{ color: "#a38051", fontSize: "30px" }}
            >
              Best Saller
            </h3>
            <BestSold />
          </div>
        </div>
      </div>
      {/* <h3 className="text-center p-3 mb-5  mt-5 display-5 jumbotron text-success">
        Sub Categories
      </h3>
      <SubCateList /> */}
    </>
  );
};

export default Home;

import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import Newarrivals from "../components/home/Newarrivals";
import BestSold from "../components/home/BestSold";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-info h1 font-weight-bold text-center">
        <Jumbotron text={["New Arrivals", "Latest Products", "Best Sellers"]} />
      </div>
      <h3 className="text-center p-3 mb-5  mt-5 display-4 jumbotron text-danger">
        New Arrivals
      </h3>
      <Newarrivals />
      <h3 className="text-center p-3 mb-5  mt-5 display-4 jumbotron text-danger">
        Best Sold
      </h3>
      <BestSold />
    </>
  );
};

export default Home;

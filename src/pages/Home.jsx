import React from "react";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import Carousel from "../components/Carousel";

const Home = () => {
  return (
    <>
      <Carousel />
      <FeaturedProducts type="featured" />
      <Categories />
      <FeaturedProducts type="trending" />
    </>
  );
};

export default Home;

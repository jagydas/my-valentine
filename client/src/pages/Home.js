import React from "react";
import GiftList from "../components/GiftList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <GiftList />
      <Cart />
    </div>
  );
};

export default Home;

import React from "react";
import {
  Announcement,
  Categories,
  Footer,
  Navbar,
  Newsletter,
  Products,
  Slider,
} from "../components";
import { useDispatch, useSelector } from "react-redux";

function Home() {


  const dispatch = useDispatch();

  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
}

export default Home;

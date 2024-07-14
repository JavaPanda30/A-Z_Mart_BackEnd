import React, { Fragment } from "react";
import * as CG from "react-icons/cg";
import "./Home.css";
import Product from './Product.js';
import MetaData from "../layout/MetaData.js";
const product={
  name:"TShirt",
  images:[{url:"/assets/ecommerce images/top1.jpg"}],
  price:"₹3000",
  _id:"Aman",
}

window.addEventListener("scroll", function () {
  var scrollPosition = window.scrollY;
  var banner = document.querySelector(".banner");

  if (scrollPosition > 200) {
    banner.classList.add("scroll-down");
    banner.classList.remove("scroll-up"); 
  } else {
    banner.classList.add("scroll-up");
    banner.classList.remove("scroll-down"); 
  }
});


const Home = () => {
  return (
    <Fragment>
      <MetaData title='AZ Mart-One StopShop for Anything Everything'/>
      <div className="banner poppins-thin">
        <h1>Welcome to AZ Mart</h1>
        <p>Find Amazing Products Below</p>
        <a href="#container1">
          <button className="shopNow">
            Shop Now
            <span>
            <CG.CgMouse />
            </span>
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div id='container1' className="container1">
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
      </div>
    </Fragment>
  );
};

export default Home;

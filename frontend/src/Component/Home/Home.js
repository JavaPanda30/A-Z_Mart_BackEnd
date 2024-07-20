import React, { Fragment, useEffect } from "react";
import * as CG from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/MetaData.js";
import { getProduct } from "../../actions/productAction.js";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../layout/Loading/Loading.js";
import { useAlert } from "react-alert";

window.addEventListener("scroll", function () {
  var scrollPosition = window.scrollY;
  var banner = document.querySelector(".banner");

  if (banner) {
    if (scrollPosition > 200) {
      banner.classList.add("scroll-down");
      banner.classList.remove("scroll-up");
    } else {
      banner.classList.add("scroll-up");
      banner.classList.remove("scroll-down");
    }
  } else {
    window.removeEventListener("scroll", () => {});
  }
});

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [alert, dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <Fragment>
          <MetaData title="AZ Mart-One StopShop for Anything Everything" />
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
          <div id="container1" className="container1">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;

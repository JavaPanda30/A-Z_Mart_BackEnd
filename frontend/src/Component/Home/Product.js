import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";


function Product({ product }) {
  
  const options = {
    edit: true,
    size: window.innerWidth < 600 ? 18 : 25,
    isHalf: true,
    color: "rgb(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.ratings,
  };
  
  return (
    <Link className="productCard" to={product._id}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />
        <span>({product.numberOfReviews} Reviews)</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
}

export default Product;

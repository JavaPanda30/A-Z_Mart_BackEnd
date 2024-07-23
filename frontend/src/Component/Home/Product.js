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
    <Link className="productCard" to={`/product/${product._id}`}>
      {/* <img src={product.images[0].url} alt={product.name} /> */}
      <img src="https://envato-shoebox-0.imgix.net/becd/55cb-b355-41a1-8e95-8791a45538d6/Digital+washing+machine+on+white+background.jpg?auto=compress%2Cformat&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&w=800&fit=max&markalign=center%2Cmiddle&markalpha=18&s=b8bb1e1eea1bafa95b52c7e024c37e41" alt={product.name} />
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
 
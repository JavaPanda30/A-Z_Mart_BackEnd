import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import "./ProductDetails.css";
import { useAlert } from "react-alert";
import { Loading } from "../layout/Loading/Loading.js";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getProductDetails(id));
  }, [alert, dispatch, error, id]);
  return (
    <Fragment>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <Fragment>
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product &&
                  product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarousalImage"
                      src="https://envato-shoebox-0.imgix.net/becd/55cb-b355-41a1-8e95-8791a45538d6/Digital+washing+machine+on+white+background.jpg?auto=compress%2Cformat&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&w=800&fit=max&markalign=center%2Cmiddle&markalpha=18&s=b8bb1e1eea1bafa95b52c7e024c37e41"
                      key={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;

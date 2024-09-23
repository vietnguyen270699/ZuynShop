import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/Cart";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../Styles/ProductScreen.css";

function ProductScreen({ match }) {
  const [item, setItem] = useState(null);
  const [toast, setToast] = useState(false);
  const [countCart, setCountCart] = useState(1);
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${match.params.id}`)
      .then((res) => {
        setItem(res.data);
      });
  }, [match]);

  const { addToCart } = useContext(CartContext);

  const cartClick = (product) => {
    addToCart(product, countCart);
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 1500);
  };

  return (
    <div>
      <div className={toast ? "toast toast-show-success" : "toast"}>
        <FontAwesomeIcon icon={faCheckCircle} className="icon" />
        Product is added to cart successfully
      </div>

      <div className="productscreen">
        <div className="prductscreen__left">
          <div className="left__image">
            <img
              src={
                item !== null
                  ? item.image
                  : "https://xetai123.vn/images/loading-small.gif"
              }
              width="100%"
              alt="product name"
            />
          </div>

          <div className="left__info">
            <p className="left__name">{item !== null ? item.title : "---"}</p>
            <p>${item !== null ? item.price : "---"}</p>
            <p>Description: {item !== null ? item.description : "---"}</p>
          </div>
        </div>
        <div className="prductscreen__right">
          <div className="right__info">
            <p>
              Price: <span>${item !== null ? item.price : "---"}</span>
            </p>
            <p>
              Status: <span>In Stock</span>
            </p>
            <div className= 'quality'>
              <p>Quality</p>
              <div className="count-cart noselect">
                <div
                  className="count-cart-item left flex-center"
                  onClick={() => {
                    if (countCart > 1) setCountCart(countCart - 1);
                  }}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </div>
                <div className="count-cart-item text flex-center">
                  <form>
                    <input
                      type="text"
                      value={countCart}
                      onChange={(e) => {
                        setCountCart(
                          Number(e.target.value.replace(/\D+/g, ""))
                        );
                      }}
                    />
                  </form>
                </div>
                <div
                  className="count-cart-item right flex-center"
                  onClick={() => {
                    setCountCart(countCart + 1);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </div>
              </div>
           
            <p>
              <button onClick={() => cartClick(item)}>Add to Cart</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;

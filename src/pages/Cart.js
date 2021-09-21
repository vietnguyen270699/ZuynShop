import React, { useContext, useState } from "react";
import "../Styles/Cart.css";
import { CartContext } from "../contexts/Cart";
import "../Styles/Product.css";
import "../Styles/Toast.css";
import CartItem from "../Header/CartItem";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Cart() {
  const [tabID, setTabID] = useState(0);
  const [toast, setToast] = useState(false);
  const product = useContext(CartContext);

  const changeToast = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 1500);
  };
  return (
    <div>
      <div className={toast ? "toast toast-show-delete" : "toast"}>
        <FontAwesomeIcon icon={faTrashAlt} className="icon" />
        Product is deleted to cart
      </div>
      <div className="Cart">
        <div className="search-header flex">
          <div className="search-title"></div>
        </div>
        <div className="fadeIn">
          <div className="search-tab login-tab flex">
            <div
              className={
                tabID === 0
                  ? "search-tab-cate search-tab-active"
                  : "search-tab-cate"
              }
              onClick={() => setTabID(0)}
            >
              Cart
            </div>
          </div>

          <div className="Cart-content">
            {product.cartItem.map((item, index) => (
              <CartItem item={item} key={index} changeToast={changeToast} />
            ))}
          </div>
        </div>

        <div className="cart-checkout-box flex-center">
          <div className="cart-checkout-text flex">
            <p>Total: $ {product.totalCost}</p>
          </div>
          <div className="cart-checkout-btn btn">Checkout</div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

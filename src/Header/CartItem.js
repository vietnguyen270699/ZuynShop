import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/Cart";
import "../Styles/CartItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function CartItem(props) {
  const { removeFromCart,updateCount,minusCount,plusCount } = useContext(CartContext);
 
  const deleteProduct = (id) => {
    props.changeToast();
    removeFromCart(id);
  };
  const plusCountProduct = (id) => {
    plusCount(id);
  };
  const minusCountProduct = (id) => {
    minusCount(id);
  };

  return (
    <div className="cartitem">
      <div className="cartitem__image">
        <img src={props.item.image} alt="name" />
      </div>
      <Link to={`/product/${props.item.id}`} className="cartitem__name">
        <p>{props.item.title}</p>
      </Link>
      <p className="cartitem__price">${props.item.price}</p>

      <div className="count-cart noselect in-cart">
        <div className='flex-center'>
        <div
          className="count-cart-item left flex-center"
          onClick={()=>minusCountProduct(props.item.id)}
        >
          <FontAwesomeIcon icon={faMinus} />
        </div>
        <div className="count-cart-item text flex-center">
          <form style={{ width: "100%", margin: "0", height: "30px" }}>
            <input
              style={{ width: "100%", margin: "0", height: "30px" }}
              type="text"
              value={props.item.count}
              id={props.item.id}
               onChange={updateCount}
            />
          </form>
        </div>
        <div
          className="count-cart-item right flex-center"
          onClick={()=>plusCountProduct(props.item.id)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
        </div>
      </div>
      <button
        onClick={() => deleteProduct(props.item.id)}
        className="cartItem__deleteBtn"
      >
        Delete
      </button>
    </div>
  );
}
export default CartItem;

import React from "react";
import { useSelector } from "react-redux";
import CartForm from "./CartForm";
import CartItem from "./CartItem";

const Cart = () => {
  const listCart = useSelector((state) => state.inCart);

  return (
    <div className="main-container">
      {!listCart.length && <p className="cart-title">Ваша корзина пуста</p>}
      {listCart && (
        <ul className="list-cart">
          {listCart.map((el, index) => (
            <CartItem {...el} key={index} index={index} />
          ))}
        </ul>
      )}
      <CartForm />
    </div>
  );
};

export default Cart;

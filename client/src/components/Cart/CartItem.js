import React from "react";
import { useStorage } from "../../hooks/storage.hook";
import formatMoney from "@jlozovei/format-money";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteToCart,
  minusAmountItem,
  plusAmountItem,
} from "../../redux/action";

const CartItem = ({
  name,
  img,
  info,
  color,
  size,
  amountInCart,
  price,
  index,
}) => {
  const dispatch = useDispatch();
  const listCart = useSelector((state) => state.inCart);

  const amountPlus = (e) => {
    switch (e.target.textContent) {
      case "add":
        dispatch(plusAmountItem(index));
        return;

      case "remove":
        if (listCart[index].amountInCart === 1) {
          dispatch(deleteToCart(index));
        } else {
          dispatch(minusAmountItem(index));
        }
        return;

      default:
        return;
    }
  };

  return (
    <>
      <li>
        <div className="col s6 m6">
          <h2 className="header">{name.toUpperCase()}</h2>
          <div className="card horizontal card-item">
            <div className="card-image card-image-cart">
              <img src={img} alt={name} />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <p>{info.toUpperCase()}</p>
                <div>
                  <p className="price-cart-item">
                    Сума: {""}
                    {formatMoney({
                      value: price * amountInCart,
                      currencyCode: "UAH",
                      locale: "UA",
                    })}
                  </p>
                </div>
              </div>
              <div className="card-action card-action-option">
                <p>Колір: {color}</p>
                <p>Розмір: {size}</p>
              </div>
              <div className="card-action">
                <button className="btn-floating ">
                  <i
                    className="material-icons"
                    name="remove"
                    onClick={amountPlus}
                  >
                    remove
                  </i>
                </button>
                <div>
                  <p className="count-order">{amountInCart}</p>
                </div>
                <button className="btn-floating ">
                  <i
                    className="material-icons"
                    name="remove"
                    onClick={amountPlus}
                  >
                    add
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default CartItem;

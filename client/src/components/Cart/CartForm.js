import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearCart } from "../../redux/action";
import formatMoney from "@jlozovei/format-money";
import M from "materialize-css";

const CartForm = () => {
  const dispatch = useDispatch();
  const listCart = useSelector((state) => state.inCart);
  const user = useSelector((state) => state.isAuth);
  const history = useHistory();

  const [form, setForm] = useState("");

  const allOrderCount = () => {
    if (listCart) {
      const allOrder = listCart.reduce((acc, el) => {
        acc += el.amountInCart;
        return acc;
      }, 0);
      return allOrder;
    }
  };

  const allOrderCountSum = () => {
    if (listCart) {
      const allOrder = listCart.reduce((acc, el) => {
        acc += el.amountInCart * el.price;
        return acc;
      }, 0);
      return allOrder;
    }
  };

  const options = {
    // era: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    // weekday: "long",
    // timezone: "UTC",
    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
  };

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const submitOrder = async () => {
    try {
      const newOrder = {
        ...form,
        goods: listCart,
        count: allOrderCount(),
        sum: allOrderCountSum(),
        owner: user.userId,
        date: Date.now(),
      };

      const data = await axios.post("/cart/post/order", newOrder);

      if (data) {
        dispatch(clearCart());
        setForm("");
        M.toast({ html: "Дякуємо за замовлення.", classes: "rounded" });
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3 order-input">
        <div className="card blue-grey darken-1 form-cart">
          <div className="card-content white-text">
            <span className="card-title">Всього: {allOrderCount()} шт</span>
            <span className="card-title">
              Сумма замовлення:
              <span className="total-sum">
                {formatMoney({
                  value: allOrderCountSum(),
                  currencyCode: "UAH",
                  locale: "UA",
                })}
              </span>
            </span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Напишіть Ваше ім'я"
                  id="name"
                  type="text"
                  value={form.name}
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="name">Як Вас звати:</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Напишіть Ваш Email"
                  id="email"
                  type="email"
                  value={form.email}
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Ваш email:</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Напишіть Ваш номер телефону"
                  id="phone"
                  type="tel"
                  value={form.phone}
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="phone">Ваш номер телефону:</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Напишіть адресу доставки"
                  id="adress"
                  type="text"
                  value={form.adress}
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="adress">Ваша адреса:</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn waves-effect waves-light btn-auth-m"
              type="submit"
              name="action"
              onClick={submitOrder}
              disabled={listCart === null}
            >
              Замовити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartForm;

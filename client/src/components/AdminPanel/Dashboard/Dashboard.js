import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { Link, NavLink } from "react-router-dom";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import styles from "../admin.module.css";
import "react-calendar/dist/Calendar.css";

import "react-datepicker/dist/react-datepicker.css";
// import "/boot";

const Dashboard = () => {
  const dispatch = useDispatch();
  const filterAdmin = useSelector((state) => state.adminPanel.filterAdmin);
  const [dateFinish, setDateFinish] = useState(
    new Date().toLocaleDateString().split(".").reverse().join("-")
  );
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString().split(".").reverse().join("-")
  );
  const [isOpen, setIsOpen] = useState(false);
  const [classItem, setClassItem] = useState("");
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [ordersFilter, setOrdersFilter] = useState([]);

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

  const openList = () => {
    setIsOpen(!isOpen);
    setClassItem("collapsible-body-item");
  };

  const allSum = () => {
    const suma = orders.reduce((acc, order) => {
      acc += order.sum;
      return acc;
    }, 0);
    return suma;
  };

  const filterOrdersToDate = (st) => {
    const startDateS = st.split("-").join(",");
    const start = new Date(startDateS).getMonth() + 1;
    const filterOrder = orders.filter((order) => {
      if (!order.date) {
        return;
      }
      const month = new Date(+order.date).getMonth() + 1;
      return month === start;
    });
    setOrdersFilter(filterOrder);
  };

  const onChangeCalendarStart = (e) => {
    setStartDate(e.target.value);
    filterOrdersToDate(e.target.value);
  };

  const acountOrders = () => {
    if (!ordersFilter.length) {
      const allGoods = orders.reduce((acc, order) => {
        acc += +order.count;
        return acc;
      }, 0);
      return allGoods;
    }
    const allGoodsFilter = ordersFilter.reduce((acc, order) => {
      acc += +order.count;
      return acc;
    }, 0);
    return allGoodsFilter;
  };

  useEffect(() => {
    axios.get(`/api/admin/users`).then((res) => setUsers(res.data));
    axios.get(`/api/admin/orders`).then((res) => setOrders(res.data));
  }, []);

  return (
    <div>
      <div>
        <p></p>
      </div>
      <div>
        <li>
          <ul className="collapsible" data-collapsible="accordion">
            <li>
              <div
                className="collapsible-header list-header_admin"
                onClick={openList}
              >
                <div>
                  {isOpen && <i className="material-icons">arrow_drop_up</i>}
                  {!isOpen && <i className="material-icons">arrow_drop_down</i>}
                  {/* {date} */}
                </div>
                <div>
                  <p>
                    Всього зареєстровано користувачів: {""}
                    <span>{users.length}</span>
                  </p>
                  <p>
                    Всього замовлень: {""} <span>{orders.length}</span>{" "}
                    <span>
                      На суму: {""}
                      <span>{allSum()}</span>
                    </span>
                  </p>
                  {/* {formatMoney({
                    value: sum,
                    currencyCode: "UAH",
                    locale: "UA",
                  })} */}
                </div>
              </div>
              {isOpen && (
                <div className={`collapsible-body ${classItem}`}>
                  <div className={styles["admin-calendar"]}>
                    <input
                      type="month"
                      onChange={onChangeCalendarStart}
                    ></input>
                  </div>
                  <div>
                    <p>
                      Замовленнь:{""}
                      <span>
                        {ordersFilter.length
                          ? ordersFilter.length
                          : orders.length}
                      </span>
                    </p>
                    <p>
                      Замовлено товарів: <span> {acountOrders()}</span>
                    </p>
                    <p>{/* Адреса доставки: <span> {adress}</span> */}</p>
                    <p>{/* Тел: <span> {phone}</span> */}</p>
                    <p>{/* Email: <span>{email}</span> */}</p>
                    <p>{/* Кількість: <span> {count}</span> */}</p>
                  </div>
                  <div className="order-good">
                    <p>Замовленні товари</p>
                    <ul>
                      {/* {goods.map((el) => (
                        <li className="order-goods">
                          <Link to={`/shop/${el._id}`} className="order-link">
                            <img
                              src={el.img}
                              alt={el.name}
                              className="img-goods"
                            />
                            <p>{el.name.toUpperCase()}</p>
                          </Link>
                          <div className="order-goods_info">
                            <p>
                              Ціна:{" "}
                              <span>
                                {formatMoney({
                                  value: el.price,
                                  currencyCode: "UAH",
                                  locale: "UA",
                                })} */}
                      {/* </span>
                            </p> */}
                      <p>{/* Кількість: <span>{el.amountInCart}</span> */}</p>
                      <p>
                        Сума:{" "}
                        {/* <span>
                                {formatMoney({
                                  value: sum,
                                  currencyCode: "UAH",
                                  locale: "UA",
                                })}
                              </span> */}
                      </p>
                      {/* </div> */}
                      {/* </li>
                      ))} */}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </li>
      </div>
      {/* <Calendar onChange={setDate} value={date} /> */}
    </div>
  );
};

export default Dashboard;

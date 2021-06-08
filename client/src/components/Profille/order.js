import React, { useState } from "react";
import { Link } from "react-router-dom";
import formatMoney from "@jlozovei/format-money";

const OrderUser = ({ date, sum, goods, adress, name, phone, email, count }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [classItem, setClassItem] = useState("");

  const openList = () => {
    setIsOpen(!isOpen);
    setClassItem("collapsible-body-item");
  };
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateNow = () => {
    return new Date(+date).toLocaleDateString("uk-UA", options);
  };
  console.log(dateNow());
  return (
    <li>
      <ul className="collapsible" data-collapsible="accordion">
        <li>
          <div className="collapsible-header list-header" onClick={openList}>
            <div>
              {isOpen && <i className="material-icons">arrow_drop_up</i>}
              {!isOpen && <i className="material-icons">arrow_drop_down</i>}
              {dateNow()}
            </div>
            <div>
              Сума:{" "}
              {formatMoney({
                value: sum,
                currencyCode: "UAH",
                locale: "UA",
              })}
            </div>
            <div className="img-header">
              {goods.map((el) => (
                <img
                  src={el.img}
                  alt={el.name}
                  key={el._id}
                  className="img-order-header"
                />
              ))}
            </div>
          </div>
          {isOpen && (
            <div className={`collapsible-body ${classItem}`}>
              <div>
                <p>Інформація про замовлення:</p>
                <p>
                  Покупець: <span> {name}</span>
                </p>
                <p>
                  Адреса доставки: <span> {adress}</span>
                </p>
                <p>
                  Тел: <span> {phone}</span>
                </p>
                <p>
                  Email: <span>{email}</span>
                </p>
                <p>
                  Кількість: <span> {count}</span>
                </p>
              </div>
              <div className="order-good">
                <p>Замовленні товари</p>
                <ul>
                  {goods.map((el) => (
                    <li className="order-goods" key={el._id + Date.now()}>
                      <Link to={`/shop/${el._id}`} className="order-link">
                        <img src={el.img} alt={el.name} className="img-goods" />
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
                            })}
                          </span>
                        </p>
                        <p>
                          Кількість: <span>{el.amountInCart}</span>
                        </p>
                        <p>
                          Сума:{" "}
                          <span>
                            {formatMoney({
                              value: sum,
                              currencyCode: "UAH",
                              locale: "UA",
                            })}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </li>
      </ul>
    </li>
  );
};

export default OrderUser;

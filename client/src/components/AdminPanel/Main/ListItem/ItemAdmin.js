import React from "react";
import formatMoney from "@jlozovei/format-money";

import styles from "../../admin.module.css";
import { useDispatch } from "react-redux";
import { deleteItems } from "../../../../redux/middleware";
import { setFormItem } from "../../../../redux/action";

const ItemAdmin = (good) => {
  const dispatch = useDispatch();

  const updateGood = () => {
    dispatch(setFormItem(good));
    window.scrollTo(0, 0);
  };

  const deleteGood = () => {
    const id = good._id;
    dispatch(deleteItems(id));
  };

  const ucFirst = (str) => {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
  };
  return (
    <li className="row">
      <div className="col s12 l12">
        <div className="card fix">
          <div className="card-image">
            <img src={good.img} alt={good.name} />
          </div>
          <div className={styles.content}>
            <div className={styles.name}>
              <span className={styles.title}>{good.name.toUpperCase()}</span>
            </div>
            <p className={styles.species}>
              {ucFirst(good.species)} {good.category.toLowerCase()}
            </p>
            <p>
              {formatMoney({
                value: good.price,
                currencyCode: "UAH",
                locale: "UA",
              })}
            </p>
          </div>
          <div className={`card-action ${styles.card}`}>
            <button type="submit" className="button-to" onClick={updateGood}>
              Редагувати
            </button>
            <button type="submit" className="button-to" onClick={deleteGood}>
              Видалити
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ItemAdmin;

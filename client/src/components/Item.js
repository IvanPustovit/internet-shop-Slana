import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMessage } from "../hooks/message.hook";
import Loader from "./Loader";
import { addToCart, plusAmountItem } from "../redux/action";
import formatMoney from "@jlozovei/format-money";
import { getIdItem } from "../redux/middleware";

const Item = () => {
  const dispatch = useDispatch();

  const cartOrder = useSelector((state) => state.inCart);
  const user = useSelector((state) => state.isAuth);
  const item = useSelector((state) => state.item);

  const [isModal, setIsModal] = useState(false);

  const message = useMessage();
  const history = useHistory();
  // const [item, setItem] = useState({});
  const [data, setData] = useState({});
  const idItem = useParams().id;

  function byField(field) {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitToCart = () => {
    const order = { ...item, ...data, amountInCart: 1 };
    const n = cartOrder.find(
      (el) => el.color === data.color && el.size === data.size
    );
    if (n) {
      const index = cartOrder.indexOf(n);
      dispatch(plusAmountItem(index));
      message("Товар добавлено в корзину!");
      history.push("/");
      return;
    }

    dispatch(addToCart(order));
    message("Товар добавлено в корзину!");
    history.push("/");
  };

  const modal = () => {
    const mod = !isModal;
    setIsModal(mod);
    console.log(isModal);
  };

  useEffect(() => {
    dispatch(getIdItem(idItem));
  }, [idItem]);

  function isEmpty(obj) {
    for (let key in obj) {
      return false;
    }
    return true;
  }

  return (
    <>
      {isEmpty(item) && <Loader />}
      {!isEmpty(item) > 0 && (
        <div className="row main-container">
          <div className="col s12 m12 l12">
            <div className="card card-item horizontal">
              <div className="card-image">
                <img className="img-modal" src={item.img} alt={item.alt} />
              </div>

              <div className="card-stacked">
                <p className="card-content card-name">
                  "{item.name.toUpperCase()}"
                </p>
                <div className="card-content">
                  <p>{item.info.toUpperCase()}</p>
                </div>

                <div className="select-item-group">
                  <div className="input-field col s12">
                    {item.species === "футболка" && (
                      <select
                        className="select-item"
                        name="color"
                        onChange={dataHandler}
                      >
                        <optgroup label="Україна">
                          <option></option>

                          <option value="білий-україна">Білий</option>
                        </optgroup>
                        <optgroup label="Турція">
                          <option className="bgr-white" value="білий-турція">
                            Білий
                          </option>
                          <option className="bgr-black" value="чорний-турція">
                            Чорний
                          </option>
                          <option className="bgr-grey" value="сірий-турція">
                            Сірий
                          </option>
                        </optgroup>
                        <optgroup label="Венгрія">
                          <option value="білий-венгрія">Білий</option>
                          <option value="чорний-венгрія">Чорний</option>
                          <option value="жовтий-венгрія">Жовтий</option>
                          <option value="синій-венгрія">Синій</option>
                          <option value="зелений-венгрія">Зелений</option>
                          <option value="сірий-венгрія">Сірий</option>
                          <option value="блакитний-венгрія">Блакитний</option>
                        </optgroup>
                      </select>
                    )}
                    {item.species === "рушник" && (
                      <select
                        className="select-item"
                        name="color"
                        onChange={dataHandler}
                      >
                        <optgroup label="Узбекистан">
                          <option></option>

                          <option className="bgr-white" value="1">
                            1
                          </option>

                          <option className="bgr-white_a" value="2">
                            2
                          </option>
                          <option className="bgr-white_b" value="3">
                            3
                          </option>
                          <option className="bgr-white_c" value="4">
                            4
                          </option>
                          <option className="bgr-white_d" value="5">
                            5
                          </option>
                          <option className="bgr-white_e" value="6">
                            6
                          </option>
                          <option className="bgr-white_f" value="7">
                            7
                          </option>
                          <option className="bgr-white_g" value="8">
                            8
                          </option>
                          <option className="bgr-white_h" value="9">
                            9
                          </option>
                          <option className="bgr-white_j" value="10">
                            10
                          </option>
                          <option className="bgr-white_k" value="11">
                            11
                          </option>
                          <option className="bgr-white_l" value="12">
                            12
                          </option>
                          <option className="bgr-white_m" value="13">
                            13
                          </option>
                          <option className="bgr-white_n" value="14">
                            14
                          </option>
                          <option className="bgr-white_o" value="15">
                            15
                          </option>
                        </optgroup>
                      </select>
                    )}
                    <label className="label-item">Виберіть колір</label>
                  </div>

                  <div className="input-field col s12">
                    <select
                      className="select-item"
                      name="size"
                      onChange={dataHandler}
                    >
                      <optgroup label="Розмір">
                        <option></option>
                        {item.size.split(",").map((el) => (
                          <option value={el} name={el} key={el}>
                            {el}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    <label className="label-item">Виберіть розмір</label>
                  </div>

                  {item.species === "рушник" && (
                    <div className="color-img">
                      <img
                        src="/color.png"
                        alt="color"
                        className="color-img_img"
                        onClick={modal}
                      />
                    </div>
                  )}
                </div>

                <div className="card-action">
                  {!user && (
                    <Link to="/auth/login">
                      <p className="link-auth">
                        Щоб продовжити покупку зареєтруйтеся або увійдіть під
                        своїм логіном
                      </p>
                    </Link>
                  )}
                  {user && (
                    <button
                      className="btn waves-effect waves-light"
                      type="submit"
                      name="action"
                      disabled={!data.color || !data.size}
                      onClick={submitToCart}
                    >
                      В корзину
                      <i className="material-icons right">send</i>
                    </button>
                  )}

                  <p className="item-price" pattern="\d+,\d{2}">
                    {formatMoney({
                      value: item.price,
                      currencyCode: "UAH",
                      locale: "UA",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {isModal && (
            <div id="modal1" className="modal">
              <div className="modal-footer">
                <a
                  href="#!"
                  className="modal-close waves-effect waves-green btn-flat"
                  onClick={modal}
                >
                  Закрити
                </a>
              </div>
              <div className="modal-content">
                <h4>Кольори для рушників</h4>
                <img src="/color.png" alt="color" className="color-img" />
              </div>
              <div className="modal-footer">
                <a
                  href="#!"
                  className="modal-close waves-effect waves-green btn-flat"
                  onClick={modal}
                >
                  Закрити
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Item;

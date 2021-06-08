import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Loader from "../components/Loader";
import { useMessage } from "../hooks/message.hook";

import "../index.css";
import { clearError, offLoader, onLoader } from "../redux/action";
import { addUser } from "../redux/middleware";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const errorMessage = useSelector((state) => state.errors);
  const loading = useSelector((state) => state.load);
  const [user, setUser] = useState("");

  const message = useMessage();
  const [form, setForm] = useState();

  useEffect(() => {
    if (errorMessage) {
      message(errorMessage.message);
      dispatch(clearError());
      dispatch(offLoader());
    }
  }, [errorMessage]);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
      date: new Date().toLocaleDateString().split(".").reverse().join("-"),
    });
  };

  const registerHandler = () => {
    dispatch(onLoader);
    const data = dispatch(addUser(form));
    data.then((res) => setUser(res));
  };

  if (user) {
    history.push("/auth/login");
  }

  return (
    <div className="row register">
      <div className="col s12 ">
        {/* <h1 className="widht-auth">Реєстрація</h1> */}

        <div className="card blue-grey darken-1 form-cart">
          {loading && <Loader />}
          <div className="card-content white-text">
            <span className="card-title">Зареєструватися</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Напишіть Ваше Ім'я"
                  id="name"
                  type="text"
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="name">Ваше ім'я</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Напишіть Ваш Email"
                  id="email"
                  type="email"
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Ваш email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Напишіть Ваш пароль"
                  id="password"
                  type="password"
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Ваш пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <Link to="/auth/login" name="action">
              Увійти
            </Link>
            <button
              className="btn yellow darken-4"
              type="submit"
              name="action"
              onClick={registerHandler}
              disabled={loading}
            >
              Зареєструватися
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { clearError, offLoader, onLoader } from "../redux/action";
import { getUser } from "../redux/middleware";

import { useMessage } from "../hooks/message.hook";
import { useStorage } from "../hooks/storage.hook";

import Loader from "../components/Loader";

import "../index.css";

const AuthPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const errorMessage = useSelector((state) => state.errors);
  const loading = useSelector((state) => state.load);
  const isAuth = useSelector((state) => state.isAuth);

  const message = useMessage();
  const storage = useStorage();

  const [form, setForm] = useState();

  useEffect(() => {
    if (errorMessage) {
      message(errorMessage.message);
      dispatch(clearError());
      dispatch(offLoader());
    }
  }, [errorMessage]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const loginHandler = async () => {
    dispatch(onLoader());
    dispatch(getUser(form));
  };
  if (isAuth) {
    storage.setStor("user", isAuth);
    history.push("/");
  }

  return (
    <div className="row auth-page">
      <div className="col s12 ">
        <h1 className="widht-auth">Увійти до магазину</h1>
        <div className="card blue-grey darken-1 form-cart">
          {loading && <Loader />}
          <div className="card-content white-text">
            <span className="card-title">Авторизація</span>
            <div>
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
            <button
              className="btn waves-effect waves-light btn-auth-m"
              type="submit"
              name="action"
              onClick={loginHandler}
              disabled={loading}
            >
              Увійти
            </button>
            <Link to="/auth/register" name="action">
              Зареєструватися
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

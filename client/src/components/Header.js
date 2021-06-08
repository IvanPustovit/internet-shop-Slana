import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteUser } from "../redux/action";
import M from "materialize-css";
import { filterItems, getListItem } from "../redux/middleware";

const Header = () => {
  document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.isAuth);
  const cart = useSelector((state) => state.inCart);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    dispatch(deleteUser());
    dispatch(addToCart([]));
  };

  const filterItem = (e) => {
    const name = e.target.name;
    console.log(name);
    dispatch(filterItems(name));
    // history.push(`/shop/t-shirts`);
  };

  const homePage = () => {
    dispatch(getListItem());
  };

  const totalCount = cart.reduce((acc, el) => acc + el.amountInCart, 0);

  return (
    <>
      <nav className="container brown lighten-1 z-depth-4 navigation">
        {/* <p className="baner">
          Сайт на стадії розробки, може не працювати увесь функціонал
        </p> */}
        <div className="nav-wrapper">
          {user && (
            <p className="hello">
              Вітамо{" "}
              <Link to={`/user/${user.userId}`} className="name-user">
                {user.name}
              </Link>
            </p>
          )}
          <Link to="/" className="brand-logo logo-pad " onClick={homePage}>
            <img
              alt=""
              className="responsive-img"
              width="100vh"
              src="/logo.png"
            />
          </Link>

          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <Link to="/cart" className="count mobile-cart">
            <i className=" material-icons medium">add_shopping_cart</i>
            <span className="cou mobile-count">{totalCount}</span>
          </Link>
          <ul className="right hide-on-med-and-down">
            <li>
              <NavLink to={`/t-shirt`} name="футболка" onClick={filterItem}>
                Футболки
              </NavLink>
            </li>
            <li>
              <NavLink to={`/towel`} name="рушник" onClick={filterItem}>
                Рушники
              </NavLink>
            </li>
            <li>
              <Link to="/cart" className="count">
                <i className=" material-icons medium">add_shopping_cart</i>
                <span className="cou">{totalCount}</span>
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/" onClick={logoutHandler}>
                  Вийти
                </Link>
              </li>
            )}
            {!user && (
              <li>
                <Link to="/auth/login">Увійти</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li>
          <NavLink to={`/t-shirt`} name="футболка" onClick={filterItem}>
            Футболки
          </NavLink>
        </li>
        <li>
          <NavLink to={`/towel`} name="рушник" onClick={filterItem}>
            Рушники
          </NavLink>
        </li>
        {user && (
          <li>
            <Link to="/" onClick={logoutHandler}>
              Вийти
            </Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/auth/login">Увійти</Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default Header;

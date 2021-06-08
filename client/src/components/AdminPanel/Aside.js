import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";

import styles from "./admin.module.css";
const activeStyle = {
  color: "black",
};

const Aside = () => {
  return (
    <aside>
      <div className="aside">
        <div className={styles.aside}>
          <NavLink
            to={{
              pathname: "/admin",
            }}
            className={styles["aside-link"]}
            exact
            activeStyle={activeStyle}
          >
            Статистика
          </NavLink>
          <NavLink
            to={{
              pathname: "/admin/goods",
            }}
            className={styles["aside-link"]}
            exact
            activeStyle={activeStyle}
          >
            Товари
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Aside;

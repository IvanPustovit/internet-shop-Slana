import React from "react";
import Aside from "../components/AdminPanel/Aside";
import Main from "../components/AdminPanel/Main/Main";
import styles from "../components/AdminPanel/admin.module.css";
import Dashboard from "../components/AdminPanel/Dashboard/Dashboard";
import { Route, Switch } from "react-router-dom";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <Aside />
      <Switch>
        <Route path="/admin" component={Dashboard} exact />
        <Route path="/admin/goods" component={Main} exact />
      </Switch>
    </div>
  );
};

export default Admin;

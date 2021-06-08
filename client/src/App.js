import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import routesisAuth from "./routes";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Admin from "./pages/Admin";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import ItemPage from "./pages/ItemPage";
import RegisterPage from "./pages/RegisterPage";

import { useStorage } from "./hooks/storage.hook";
import { setUser } from "./redux/action";
import "materialize-css";
import { PrivateRouter } from "./routes";
import UserCabinet from "./pages/UserCabinet";
import Main from "./components/AdminPanel/Main/Main";

function App() {
  const dispatch = useDispatch();
  const stor = useStorage();
  const user = useSelector((state) => state.isAuth);
  useEffect(() => {
    const user = stor.getStor("user");
    if (user) {
      dispatch(setUser(user));
    }
  }, []);

  return (
    <div className="container">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/t-shirt" exact>
          <Home />
        </Route>
        <Route path="/towel" exact>
          <Home />
        </Route>
        <Route path="/cart" exact>
          <CartPage />
          <Footer />
        </Route>

        <Route path="/auth/login" exact>
          <AuthPage />
        </Route>
        <Route path="/auth/register" exact>
          <RegisterPage />
        </Route>

        <PrivateRouter component={Admin} path="/admin" />
        {/* <Route path="/admin/goods" exact>
          <Admin />
          <Footer />
        </Route> */}
        <Route path="/shop/:id">
          <ItemPage />
          <Footer />
        </Route>
        <Route path="/user/:id" exact>
          <UserCabinet />
        </Route>
        <Route path="/admin/goods" component={Admin} />

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;

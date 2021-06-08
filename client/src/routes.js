// import React from "react";
// import { useSelector } from "react-redux";
// import { Switch, Route, Redirect } from "react-router-dom";
// import Footer from "./components/Footer";
// import Header from "./components/Header";
// import Admin from "./pages/Admin";
// import AuthPage from "./pages/AuthPage";
// import CartPage from "./pages/CartPage";
// import Home from "./pages/Home";
// import ItemPage from "./pages/ItemPage";
// import RegisterPage from "./pages/RegisterPage";

// const routesIsAuth = () => {
//   // const isAuthUser = useSelector((state) => state.isAuth);
//   if (isAuthUser) {
//     return (
//       <Switch>
//         <Route path="/" exact>
//           <Header />
//           <Home />
//         </Route>
//         <Route path="/cart" exact>
//           <Header />
//           <CartPage />
//           <Footer />
//         </Route>
//         <Route path="/admin" exact>
//           <Header />
//           <Admin />
//           <Footer />
//         </Route>
//         <Route path="/admin/goods" exact>
//           <Header />
//           <Admin />
//           <Footer />
//         </Route>
//         <Route path="/shop/:id">
//           <Header />
//           <ItemPage />
//           <Footer />
//         </Route>
//         {/* <Redirect to="/" /> */}
//       </Switch>
//     );
//   }
//   return (
//     <Switch>
//       <Route path="/" exact>
//         <Header />
//         <Home />
//       </Route>
//       <Route path="/cart" exact>
//         <Header />
//         <CartPage />
//       </Route>
//       <Route path="/auth/login" exact>
//         <Header />
//         <AuthPage />
//       </Route>
//       <Route path="/auth/register" exact>
//         <Header />
//         <RegisterPage />
//       </Route>
//       <Route path="/shop/:id">
//         <Header />
//         <ItemPage />
//         <Footer />
//       </Route>
//       <Redirect to="/" />
//     </Switch>
//   );
// };

// export default routesIsAuth;

import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const PrivateRouter = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.isAuth);
  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? (
          <Redirect to="/" />
        ) : user.email === "slanainfo2020@gmail.com" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export const PrivateRouterUser = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.isAuth);
  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? (
          <Redirect to="/" />
        ) : user.email === "slanainfo2020@gmail.com" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

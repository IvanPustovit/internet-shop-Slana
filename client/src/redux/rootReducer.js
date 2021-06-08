import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { listItemReducer } from "./listItemReduser";
import { userReducer } from "./userReduser";
import { errorReducer } from "./errorReducer";
import { loadingReducer } from "./loadReducer";
import { formItemReducer } from "./formItemReducer";
import { itemReducer } from "./ItemReducer";
import { adminReducer } from "./adminStore/adminReducer";
// import { footerReducer } from "./footerReducer";
// import { filterReducer } from "./filterReducer";

const rootReducer = combineReducers({
  inCart: cartReducer,
  listItem: listItemReducer,
  isAuth: userReducer,
  errors: errorReducer,
  load: loadingReducer,
  formItem: formItemReducer,
  item: itemReducer,
  // ann: { adminReducer },
  adminPanel: adminReducer,

  //   footerContact: footerReducer,
  //   filter: filterReducer,
});

export default rootReducer;

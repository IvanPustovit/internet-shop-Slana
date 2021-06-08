import React, { useEffect } from "react";
import ItemAdmin from "./ItemAdmin";

import styles from "../../admin.module.css";
import { getListItem } from "../../../../redux/middleware";
import { useDispatch, useSelector } from "react-redux";
import { offLoader, onLoader } from "../../../../redux/action";
// import Loader from "../../../Loader";

const ListItem = () => {
  const dispatch = useDispatch();
  const listGoods = useSelector((state) => state.listItem);
  // const loading = useSelector((state) => state.load);

  useEffect(() => {
    dispatch(onLoader);
    dispatch(getListItem());
    dispatch(offLoader);
  }, []);

  return (
    <ul className={styles["admin-list"]}>
      {/* {loading && <Loader />} */}
      {listGoods.map((good) => (
        <ItemAdmin {...good} key={good._id} />
      ))}
    </ul>
  );
};

export default ListItem;

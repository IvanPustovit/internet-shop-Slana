import React, { useEffect } from "react";

import Delivery from "../components/Delivery";
import Footer from "../components/Footer";
import ShopMain from "../components/ShopMain/ShopMain";
import Loader from "../components/Loader";
import { getListItem } from "../redux/middleware";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const listItem = useSelector((state) => state.listItem);

  useEffect(() => {
    dispatch(getListItem());
  }, []);

  return (
    <>
      {!listItem.length && <Loader />}
      {listItem.length > 0 && (
        <div>
          <ShopMain listItem={listItem} />
          <Delivery />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;

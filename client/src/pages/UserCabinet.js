import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader";
import M from "materialize-css";
import OrderUser from "../components/Profille/order";

const UserCabinet = () => {
  const user = useSelector((state) => state.isAuth);
  const [order, setOrder] = useState();

  useEffect(() => {
    if (user) {
      axios.get(`/api/user/${user.userId}`).then((res) => setOrder(res.data));
    }
  }, [user]);
  return (
    <>
      {!user && <Loader />}
      {user && (
        <div className="user-profille">
          <div className="user-info">
            <div>
              <i className=" material-icons medium">face</i>
            </div>
            <div>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </div>
          </div>
          <div>
            <p>Мої замовлення</p>
            <div>
              <ul>
                {!order && <Loader />}
                {order &&
                  order.map((el, index) => (
                    <OrderUser {...el} key={el._id} index={index} />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCabinet;

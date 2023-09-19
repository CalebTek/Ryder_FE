import { useNavigate } from "react-router-dom";

import styles from "./OrdersOverview.module.css";

//imgs
import { shoppingBagIcon } from "../../assets";

function OrdersOverview() {
  const navigate = useNavigate();
  function handleRequestbtn() {
    navigate("/request-form");
  }
  return (
    <div className={styles.overview_container}>
      <div className={styles.header}>
        <span>Total orders</span>
        <span onClick={handleRequestbtn} className={styles.secondary}>
          Make a Request
        </span>
      </div>

      <div className={styles.body}>
        <div>
          <span>200</span>
          <span>orders completed</span>
        </div>
        <img src={shoppingBagIcon} alt="shopping bag svg icon" />
      </div>
    </div>
  );
}

export default OrdersOverview;

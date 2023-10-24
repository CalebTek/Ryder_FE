import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./OrdersOverview.module.css";

function OrdersOverview() {
  const navigate = useNavigate();

  function handleRequestbtn() {
    navigate("/request-form");
  }

  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    // Fetch userId from local storage
    const appUserId = localStorage.getItem("userId");

    if (appUserId) {
      const apiUrl = `https://ryder-test.onrender.com/api/v1/Order/allOrderProgress/${appUserId}`;

      fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.data)) {
            const total = data.data.filter((order) => order.appUserId === appUserId).length;
            setTotalOrders(total);
          } else {
            console.error("Data is not in the expected format");
          }
        })
        .catch((error) => console.error(error));
    }
  }, []);


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
          <span>{totalOrders}</span>
          <span>orders completed</span>
        </div>
      </div>
    </div>
  )
  }

  export default OrdersOverview;
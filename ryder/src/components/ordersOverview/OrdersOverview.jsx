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
      // Use the same API URL as AllOrders
      const apiUrl = `https://ryder-test.onrender.com/api/v1/Order/allOrderProgress/${appUserId}`;
  
      // Make the API request
      fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Check if the data is an array
          if (Array.isArray(data.data)) {
            // Filter orders for the specific appUserId and count them
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
        {/* Include any additional content or styling you want */}
      </div>
    </div>
  );
}

export default OrdersOverview;

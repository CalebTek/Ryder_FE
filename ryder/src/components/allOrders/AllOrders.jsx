import styles from "./AllOrders.module.css";

function AllOrders() {
  return (
    <div className={styles.contanier}>
      <div className={styles.header}>
        <span>My Orders</span>
        <span>See all</span>
      </div>
      <div className={styles.orders_container}>
        {/* order items list */}
        {/* for pending orders */}
        <div className={styles.orders_item}>
          <div>
            <span>
              <span className={styles.dayOfTheWeek}>Today</span> 4:15pm
            </span>
            <span>Order No - 128384948938</span>
          </div>
          <div>
            <span className={styles.pending}>pending</span>
            <span> &#x20A6; 5, 000</span>
          </div>
        </div>

        {/* for orders delivered */}
        <div className={styles.orders_item}>
          <div>
            <span>
              <span className={styles.dayOfTheWeek}>Today</span> 4:15pm
            </span>
            <span>Order No - 128384948938</span>
          </div>
          <div>
            <span className={styles.done}>done</span>
            <span> &#x20A6; 5, 000</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllOrders;

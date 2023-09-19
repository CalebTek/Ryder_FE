import styles from "./CustomerDashBoardPage.module.css";

//imgs
import { locationIcon, mailIcon, overviewIcon, phoneIcon } from "../../assets";

//components
import { OrdersOverview, AllOrders, Messages } from "../../components";

function CustomerDashBoard() {
  return (
    <div className={styles.con}>
      <div className={styles.body_Con}>
        <div className={styles.header}>
          <img src={overviewIcon} alt="over view svg" />
          <h2>Orders</h2>
        </div>
        <div className={styles.content_container}>
          {/* componets */}
          <div className={styles.item}>
            <OrdersOverview />
          </div>
          <div className={styles.item}>
            <Messages />
          </div>
          <div className={styles.item}>
            <AllOrders />
          </div>

          {/* contact information */}
          <div className={`${styles.contact_container} ${styles.item}`}>
            <div>
              <div className={styles.header}>
                <span>Contact Us</span>
              </div>
              <div className={styles.contact_body}>
                <span>Get in touch</span>
                <small>Any question or remarks? Send us a message</small>

                <div className={styles.contact_information_container}>
                  <span className={styles.contact_infomation}>
                    <img src={mailIcon} alt="mail icon" />
                    <span>hello@ryder.com</span>
                  </span>
                  <span className={styles.contact_infomation}>
                    <img src={phoneIcon} alt="phone icon" />
                    <span>0703 XXX XXXX</span>
                  </span>
                  <span className={styles.contact_infomation}>
                    <img src={locationIcon} alt="location icon" />
                    <span>Decagon Institute</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashBoard;

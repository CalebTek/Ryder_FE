import {useState} from "react"
import styles from "./RiderDashboard.module.css";

//imgs
import { mastercard } from "../../assets";

//components
import { MapComponent } from "../../components";

function RiderDashboard() {
    const [newNotification, setNewNotication] = useState(false)
  return (
    <div className={styles.container}>
      <div className={styles.content_body}>
        <h1>Request Details</h1>

        <div>
          <span>Pickup location</span>
          <p>5, Akintayo Street, Victoria Island, Lagos</p>
        </div>
        <div>
          <span>Delivery Location</span>
          <p>89b, Olumakinde Stree, lekki, Lagos</p>
        </div>
        <div>
          <span>Package details</span>
          <p>New Hp core i7 Laptop(fully packed)</p>
        </div>
        <div>
          <span>Drop off Contact</span>
          <p>Tomiwa Olatunde</p>
          <p>080 XXXX XXX</p>
        </div>
        <div>
          <span>Payment method</span>
          <p>N3,500</p>
        </div>
        <div className={styles.form}>
          <div>
            <input type="radio" name="paymentMethod" id="paymentMethod" />
            <label htmlFor="paymentMethod">Card payment</label>
          </div>
          <img src={mastercard} alt="" />
        </div>
        <button type="button">Accept Request</button>
        <button className={styles.decline_btn} type="button">
          Decline request
        </button>
      </div>
      <div className={styles.map_container}>
              <MapComponent className={styles.map_container} />
              {/* <Notification  /> */}
      </div>
    </div>
  );
}

export default RiderDashboard;

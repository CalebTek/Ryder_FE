import styles from "./Notification.module.css"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Notification(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className={styles.header}>Incoming Request</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.body}>
          <h4>Centered Modal</h4>
          <p>
            <span>4 min</span>
            <span>2.0 km</span>
          </p>
          <p>coloins Nwachuchwu</p>
          <p>5, Akintayo street, Victoria Island, lagos</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Notification;

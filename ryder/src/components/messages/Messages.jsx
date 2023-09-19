import {useState} from "react"
import styles from "./Messages.module.css"

//img
import { messagesIcon } from "../../assets"

function Messages() {
    const [hasMessages, setHasMessages] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Messages</span>
      </div>
      {/* show this display if there are no messages */}
      {!hasMessages && (
        <div className={styles.no_messages_Container}>
          <img src={messagesIcon} alt="message icon" />
          <span>No Messages</span>
          <span>You currently do not have any message</span>
        </div>
      )}
    </div>
  );
}

export default Messages
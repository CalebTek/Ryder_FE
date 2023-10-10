import React, { useEffect, useState } from 'react';
import * as signalR from "@microsoft/signalr";


function SignalRChat() {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Initialize the SignalR connection
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:7173/notification/negotiate?negotiateVersion=1") // Replace with the actual URL of your SignalR hub
      .build();
      
      
    // Set up event handlers for incoming messages
    newConnection.on("IncomingRequest", (message) => {
      // Handle incoming request notification
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newConnection.on("RequestAccepted", (message) => {
      // Handle request accepted notification
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newConnection.on("OrderCompleted", (message) => {
      // Handle order completed notification
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Start the SignalR connection
    newConnection.start().then(() => {
      setConnection(newConnection);
     
    });

    return () => {
      // Clean up the connection when the component unmounts
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  return (
    
    <div>
      <h2>Real-Time Notifications</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default SignalRChat;

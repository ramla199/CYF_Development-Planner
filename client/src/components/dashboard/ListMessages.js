import React, { useState, useEffect } from "react";

const ListMessages = ({ allMessages, setMessagesChange }) => {
  console.log(allMessages);
  const [messages, setMessages] = useState([]); //empty array

  //delete message

  async function deleteMessage(id) {
    try {
      await fetch(`http://localhost:4000/messages/${id}`, {
        method: "DELETE",
        // headers: { token: localStorage.token },
        headers: { "Content-Type": "application/json" },
      });

      setMessages(messages.filter((message) => message.message_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setMessagesChange(allMessages);
  }, [allMessages]);

  console.log(messages);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Message</th>

            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {messages.length !== 0 &&
            messages[0].message_id !== null &&
            messages.map((message) => (
              <tr key={message.message_id}>
                <td>{message.message_text}</td>

                <td>
                  <button onClick={() => deleteMessage(message.message_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ListMessages;

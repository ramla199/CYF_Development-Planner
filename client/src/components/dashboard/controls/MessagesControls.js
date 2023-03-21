import React, { useState } from "react";
import AllMessages from "../messages/AllMessages";
import UnreadMessages from "../messages/UnreadMessages";
import SentMessages from "../messages/SentMessages";

function MessagesControls({ name }) {
  const [showAllMessages, setShowAllMessages] = useState(false);
  const [allTextButton, setAllTextButton] = useState("all");
  const [unreadTextButton, setUnreadTextButton] = useState("unread");
  const [sentTextButton, setSentTextButton] = useState("sent");

  const handleShowMessages = () => {
    setShowAllMessages(!showAllMessages);
    setShowUnreadMessages(false);
    setShowSentMessages(false);
    setAllTextButton((state) => (state === "all" ? "close" : "all"));
  };

  const [showUnreadMessages, setShowUnreadMessages] = useState(false);

  const handleShowUnreadMessages = () => {
    setShowUnreadMessages(!showUnreadMessages);
    setShowAllMessages(false);
    setShowSentMessages(false);
    setUnreadTextButton((state) => (state === "unread" ? "close" : "unread"));
  };

  const [showSentMessages, setShowSentMessages] = useState(false);

  const handleShowSentMessages = () => {
    setShowSentMessages(!showSentMessages);
    setShowUnreadMessages(false);
    setShowAllMessages(false);
    setSentTextButton((state) => (state === "sent" ? "close" : "sent"));
  };

  return (
    <>
      <div className="controls">
        <h2 className="icon-heading">Messages</h2>
        <button onClick={handleShowMessages}>{allTextButton}</button>
        <button onClick={handleShowUnreadMessages}>{unreadTextButton}</button>
        <button onClick={handleShowSentMessages}>{sentTextButton}</button>
      </div>
      <div>{showAllMessages ? <AllMessages name={name} /> : false}</div>
      <div> {showUnreadMessages ? <UnreadMessages name={name} /> : false}</div>
      <div> {showSentMessages ? <SentMessages /> : false}</div>
    </>
  );
}

export default MessagesControls;

import React, { useState } from "react";
import AllMessages from "../../Messages";
import UnreadMessages from "../UnreadMessages";
import SentMessages from "../SentMessages";

function MessagesControls() {
  const [showAllMessages, setShowAllMessages] = useState(false);

  const handleShowMessages = () => {
    setShowAllMessages(!showAllMessages);
    setShowUnreadMessages(false);
    setShowSentMessages(false);
  };

  const [showUnreadMessages, setShowUnreadMessages] = useState(false);

  const handleShowUnreadMessages = () => {
    setShowUnreadMessages(!showUnreadMessages);
    setShowAllMessages(false);
    setShowSentMessages(false);
  };

  const [showSentMessages, setShowSentMessages] = useState(false);

  const handleShowSentMessages = () => {
    setShowSentMessages(!showSentMessages);
    setShowUnreadMessages(false);
    setShowAllMessages(false);
  };

  return (
    <>
      <div className="controls">
        <button onClick={handleShowMessages}>all</button>
        <button onClick={handleShowUnreadMessages}>unread</button>
        <button onClick={handleShowSentMessages}>sent</button>
      </div>
      <div> {showAllMessages ? <AllMessages /> : false}</div>
      <div> {showUnreadMessages ? <UnreadMessages /> : false}</div>
      <div> {showSentMessages ? <SentMessages /> : false}</div>
    </>
  );
}

export default MessagesControls;

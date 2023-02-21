import React from "react";
import Controls from "./Controls";
import messagesIcon from "../images/E-mail-icon.png";

function IconMessages() {
  return (
    <>
      <div className="icon-heading">
        <h2>Messages</h2>
        <img alt="messages icon" src={messagesIcon} />
        <Controls className="controls" />
      </div>
    </>
  );
}

export default IconMessages;

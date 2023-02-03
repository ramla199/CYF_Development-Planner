import React from "react";
import BackButton from "../../BackButton";
import { useParams } from "react-router-dom";

function Message() {
  const params = useParams();
  const messageId = params.messageId;
  return (
    <>
      <BackButton />
      <div>Message {messageId} details</div>
    </>
  );
}

export default Message;

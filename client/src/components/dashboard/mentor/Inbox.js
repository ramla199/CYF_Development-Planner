import React, { useState, useEffect } from "react";
import messagesIcon from "../../../images/E-mail-icon.png";
import { Link } from "react-router-dom";

function Inbox() {
  return (
    <>
      <section className="icon-heading-container">
        <div className="icon-heading">
          <h2>Inbox</h2>
          <img alt="messages icon" src={messagesIcon} />
        </div>

        <div className="buttons">
          <Link to="/list-messages">
            <button>open</button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Inbox;

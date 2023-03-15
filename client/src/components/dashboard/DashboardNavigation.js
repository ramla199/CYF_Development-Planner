import React, { useState } from "react";

//images
import filesIcon from "../../images/Documents-icon-48.png";
import messagesIcon from "../../images/E-mail-icon.png";
import accountIcon from "../../images/icons8-test-account-48.png";

//components
import FilesControls from "./controls/FilesControls";
import MessagesControls from "./controls/MessagesControls";
import AccountControls from "./controls/AccountControls";

function DashboardNavigation({ name }) {
  const [filesControlButtons, setFilesControlButtons] = useState(false);
  const [messagesControlButtons, setMessagesControlButtons] = useState(false);
  const [accountControlButtons, setAccountControlButtons] = useState(false);

  const handleToggleFiles = () => {
    setFilesControlButtons(!filesControlButtons);
    setMessagesControlButtons(false);
    setAccountControlButtons(false);
  };

  const handleToggleMessages = () => {
    setMessagesControlButtons(!messagesControlButtons);
    setFilesControlButtons(false);
    setAccountControlButtons(false);
  };

  const handleToggleAccount = () => {
    setAccountControlButtons(!accountControlButtons);
    setFilesControlButtons(false);
    setMessagesControlButtons(false);
  };

  return (
    <>
      <div className="flex">
        <div className="icon-heading" onClick={handleToggleFiles}>
          <h2>Files</h2>
          <img src={filesIcon} alt="files icon" />
        </div>

        <div className="icon-heading" onClick={handleToggleMessages}>
          <h2>Messages</h2>
          <img src={messagesIcon} alt="messages icon" />
        </div>

        <div className="icon-heading" onClick={handleToggleAccount}>
          <h2>Account</h2>
          <img src={accountIcon} alt="account icon" />
        </div>
      </div>
      {filesControlButtons ? (
        <section>
          <FilesControls name={name} />
        </section>
      ) : (
        <></>
      )}
      {messagesControlButtons ? (
        <section>
          <MessagesControls name={name} />
        </section>
      ) : (
        <></>
      )}

      {accountControlButtons ? (
        <section>
          <AccountControls />
        </section>
      ) : (
        <></>
      )}
    </>
  );
}

export default DashboardNavigation;

import React, { useState } from "react";
import Account from "../Account";

function AccountControls() {
  const [showAccount, setShowAccount] = useState(false);

  const handleShowAccount = () => {
    setShowAccount(!showAccount);
  };
  return (
    <>
      <div className="controls">
        <h2 className="icon-heading">Account</h2>
        <button onClick={handleShowAccount}>settings</button>
      </div>
      <div> {showAccount ? <Account /> : false}</div>
    </>
  );
}

export default AccountControls;

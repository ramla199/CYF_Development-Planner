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
        <button onClick={handleShowAccount}>settings</button>
      </div>
      <div> {showAccount ? <Account /> : false}</div>
    </>
  );
}

export default AccountControls;

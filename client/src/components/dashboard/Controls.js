import React, { useState } from "react";
import DraftFiles from "../DraftFiles";

function Controls() {
  const [showAllFiles, setShowAllFiles] = useState(false);

  const handleShowFiles = () => {
    setShowAllFiles(!showAllFiles);
  };
  return (
    <>
      <div className="controls">
        <button onClick={handleShowFiles}>all</button>

        <button>drafts</button>
        <button>sent</button>
      </div>

      {showAllFiles ? <DraftFiles /> : false}
    </>
  );
}

export default Controls;

import React from "react";
import Controls from "./Controls";
import FilesList from "./FilesList";
import DraftFiles from "./DraftFiles";
import filesIcon from "../images/Documents-icon-48.png";

function IconFiles() {
  return (
    <>
      <div className="icon-heading">
        <h2>Files</h2>
        <img alt="files icon" src={filesIcon} />
        <Controls className="controls" />
        {/* <FilesList /> */}
        <DraftFiles />
      </div>
    </>
  );
}

export default IconFiles;

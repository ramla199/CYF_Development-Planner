import React from "react";
import filesIcon from "../../../images/Documents-icon-48.png";
import { Link } from "react-router-dom";

function Files() {
  return (
    <>
      <section className="icon-heading-container">
        <div className="icon-heading">
          <h2>Files</h2>
          <img alt="files icon" src={filesIcon} />
        </div>

        <div className="buttons">
          <Link to="/list-files">
            <button>open</button>
          </Link>
        </div>
        <div className="buttons">
          <Link to="/list-drafts">
            <button>open</button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Files;
